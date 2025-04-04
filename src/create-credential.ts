import { agent } from './veramo/setup.js'

async function main() {
  const identifier = await agent.didManagerGetByAlias({ alias: 'default' })

  try {
    // EIP-712 types matching our grant-agreement.md.dfsm.json example agreement
    const types = {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" }
      ],
      CredentialSubject: [
        { name: "agreement", type: "Agreement" },
        { name: "id", type: "string" }
      ],
      Agreement: [
        { name: "content", type: "Content" },
        { name: "execution", type: "Execution" },
        { name: "metadata", type: "Metadata" },
        { name: "variables", type: "Variables[]" }
      ],
      Content: [
        { name: "data", type: "string" },
        { name: "type", type: "string" }
      ],
      Execution: [
        { name: "data", type: "Data" },
        { name: "type", type: "string" }
      ],
      Data: [
        { name: "inputs", type: "Inputs" },
        { name: "states", type: "string[]" },
        { name: "transitions", type: "Transitions[]" }
      ],
      Inputs: [
        { name: "grantRecipientSignature", type: "GrantRecipientSignature" },
        { name: "workApprovedSignature", type: "WorkApprovedSignature" }
      ],
      GrantRecipientSignature: [
        { name: "description", type: "string" },
        { name: "displayName", type: "string" },
        { name: "id", type: "string" },
        { name: "schema", type: "string" },
        { name: "signer", type: "string" },
        { name: "type", type: "string" },
        { name: "value", type: "Value" }
      ],
      Value: [
        { name: "approved", type: "bool" },
        { name: "type", type: "string" }
      ],
      WorkApprovedSignature: [
        { name: "description", type: "string" },
        { name: "displayName", type: "string" },
        { name: "id", type: "string" },
        { name: "schema", type: "string" },
        { name: "signer", type: "string" },
        { name: "type", type: "string" },
        { name: "value", type: "Value" }
      ],
      Transitions: [
        { name: "conditions", type: "Conditions[]" },
        { name: "from", type: "string" },
        { name: "to", type: "string" }
      ],
      Conditions: [
        { name: "inputs", type: "string[]" },
        { name: "type", type: "string" }
      ],
      Metadata: [
        { name: "author", type: "string" },
        { name: "createdAt", type: "string" },
        { name: "description", type: "string" },
        { name: "id", type: "string" },
        { name: "name", type: "string" },
        { name: "templateId", type: "string" },
        { name: "version", type: "string" }
      ],
      Variables: [
        { name: "description", type: "string" },
        { name: "id", type: "string" },
        { name: "name", type: "string" },
        { name: "type", type: "string" },
        { name: "validation", type: "Validation" },
        { name: "value", type: "string" }
      ],
      Validation: [
        { "name": "required", "type": "bool" },
        { "name": "minLength", "type": "uint256" },
        { "name": "maxLength", "type": "uint256" },
        { "name": "pattern", "type": "string" },
        { "name": "message", "type": "string" },
        { "name": "min", "type": "uint256" },
        { "name": "max", "type": "uint256" }
      ],
      Issuer: [
        { name: "id", type: "string" }
      ],
      Proof: [
        { name: "created", type: "string" },
        { name: "proofPurpose", type: "string" },
        { name: "type", type: "string" },
        { name: "verificationMethod", type: "string" }
      ],
      VerifiableCredential: [
        { name: "@context", type: "string[]" },
        { name: "credentialSubject", type: "CredentialSubject" },
        { name: "issuanceDate", type: "string" },
        { name: "issuer", type: "Issuer" },
        { name: "proof", type: "Proof" },
        { name: "type", type: "string[]" }
      ]
    };

    // the maching credentialSubject
    const credentialSubject = {
      id: "did:example:grant-recipient-1",
      agreement: {
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
      },
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