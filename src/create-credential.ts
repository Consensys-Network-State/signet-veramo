import { agent } from './veramo/setup.js'
import { types } from './EIP712-types.js'
import { readFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const agreement2 = JSON.parse(readFileSync(join(__dirname, 'grant-agreement.md.dfsm.json'), 'utf-8'));

function ensureValidationFields(obj: any) {
  if (Array.isArray(obj)) {
    obj.forEach(item => ensureValidationFields(item));
  } else if (typeof obj === 'object' && obj !== null) {
    // If this is a validation object, ensure all fields have values
    if ('validation' in obj) {
      const validation = obj.validation;
      const requiredFields = ['required', 'message', 'minLength', 'maxLength', 'pattern', 'min', 'max'];
      
      requiredFields.forEach(field => {
        if (!(field in validation)) {
          validation[field] = field === 'required' ? true : 
                            field === 'message' ? '' : 
                            field === 'minLength' || field === 'maxLength' || field === 'min' || field === 'max' ? 0 : '';
        }
      });
    }
    
    // Recursively process all properties
    Object.values(obj).forEach(value => ensureValidationFields(value));
  }
}

// Ensure all validation fields have values
ensureValidationFields(agreement2);

const agreement = {
  metadata: {
    id: "did:example:123",
    templateId: "did:template:grant-agreement-v1",
    version: "1.0.0",
    createdAt: "2024-03-20T12:00:00Z",
    name: "Grant Agreement",
    author: "Ecosystem Foundation",
    description: "Standard grant agreement for ecosystem development funding"
  },
  variables: [
    {
      id: "grantRecipientName",
      type: "string",
      name: "Grant Recipient Name",
      description: "Name of the grant recipient",
      value: "Project X",
      validation: { // Note how all of the fields must have a value in order for EIP-712 signing to be happy. No sparse objects with nullable fields!
        required: true,
        message: "Must be a string",
        minLength: 0,
        maxLength: 0,
        pattern: "",
        min: 0,
        max: 0
      }
    },
    {
      id: "grantAmount",
      type: "number",
      name: "Grant Amount",
      description: "Amount of tokens to be granted",
      value: "100000",
      validation: {
        required: true,
        message: "Must be a number >= 0",
        minLength: 0,
        maxLength: 0,
        pattern: "",
        min: 0,
        max: 0
      }
    },
    {
      id: "grantRecipientAddress",
      type: "address",
      name: "Grant Recipient Address",
      description: "Ethereum address of the grant recipient",
      value: "0x123f6e75d1BE0ee699C7Eb67594FEbC14ab3AA78",
      validation: {
        required: true,
        message: "Must be a string matching the pattern",
        minLength: 0,
        maxLength: 0,
        pattern: "^0x[a-fA-F0-9]{40}$",
        min: 0,
        max: 0
      }
    }
  ],
  content: {
    type: "md",
    data: `# Grant Agreement
      
      This agreement is made between the Ecosystem Foundation ("Foundation") and :variable{id='grantRecipientName'} ("Recipient").
      
      ## Grant Details
      
      1. The Foundation agrees to grant :variable{id='grantAmount'} tokens to the Recipient.
      2. The tokens will be transferred to the Recipient's address: :variable{id='grantRecipientAddress'}.
      
      ## Terms and Conditions
      
      1. The Recipient agrees to use the granted tokens for the development of their project.
      2. The Foundation reserves the right to revoke the grant if the Recipient fails to meet the agreed-upon milestones.
      
      ## Signatures
      
      **Foundation Representative:**
      Ecosystem Foundation
      
      **Recipient:**
      :variable{id='grantRecipientName'}
      Address: :variable{id='grantRecipientAddress'}`
  },
  execution: {
    type: "dfsm",
    data: {
      states: [
        "AWAITING_SIGNATURES",
        "ACTIVE_PENDING_REVIEW",
        "APPROVED",
        "REJECTED"
      ],
      inputs: {
        grantRecipientSignature: {
          id: "grantRecipientSignature",
          type: "VerifiedCredentialEIP712",
          schema: "verified-credential-eip712.schema.json",
          displayName: "Grant Recipient Signature",
          description: "EIP712 signature from the grant recipient accepting the terms of the grant agreement",
          value: {
            type: "GrantrReceipt",
            approved: true
          },
          signer: "${grantRecipientAddress}"
        },
        workApprovedSignature: {
          id: "workApprovedSignature",
          type: "VerifiedCredentialEIP712",
          schema: "verified-credential-eip712.schema.json",
          displayName: "Work Approved Signature",
          description: "EIP712 signature from the token allocator attesting that the grant work has been completed successfully",
          value: {
            type: "WorkApproval",
            approved: true
          },
          signer: "${tokenAllocatorAddress}"
        }
      },
      transitions: [
        {
          from: "AWAITING_SIGNATURES",
          to: "ACTIVE_PENDING_REVIEW",
          conditions: [
            {
              type: "isValid",
              inputs: ["grantRecipientSignature"]
            }
          ]
        },
        {
          from: "ACTIVE_PENDING_REVIEW",
          to: "APPROVED",
          conditions: [
            {
              type: "isValid",
              inputs: ["workApprovedSignature"]
            }
          ]
        }
      ]
    }
  }
};

console.log(JSON.stringify(agreement, null, 2));
console.log("--------------------------------");
console.log(JSON.stringify(agreement2, null, 2));

async function main() {
  const identifier = await agent.didManagerGetByAlias({ alias: 'default' })

  try {
    // the maching credentialSubject
    const credentialSubject = {
      id: "did:example:grant-recipient-1",
      agreement: agreement2,
    };

    const agreementVc = await agent.createVerifiableCredential({
      credential: {
        issuer: { id: identifier.did },
        credentialSubject,
        type: ['VerifiableCredential','AgreementCredential'],
      },
      // proofFormat: 'JwtProof2020',
      proofFormat: 'EthereumEip712Signature2021',
      // This is utilizing one of our veramo lib patches to supply the EIP-712 model definition directly,
      // instead of attemping to auto-generate it.
      eip712Types: types,
    });

    const result2 = await agent.verifyCredential({ credential: agreementVc })
    console.log("Verification result: ", result2)
  } catch(e) {
    console.error("Error", e)
  }
}

main().catch(console.log)