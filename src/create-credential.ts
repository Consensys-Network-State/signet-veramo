import { agent, privKeyStore, credentialIssuerEIP712 } from './veramo/setup.js'
import { secp256k1 } from '@noble/curves/secp256k1';
import  * as ut from '@noble/curves/abstract/utils';
import { keccak256 } from 'ethers/crypto'

async function main() {
  const identifier = await agent.didManagerGetByAlias({ alias: 'default' })
  // const keys = await identifier.keys;
  // console.log("key", keys[0]);
  // const pks = await privKeyStore.listKeys()
  // const pkCompressedHex = pks[0].privateKeyHex;
  // const pkFullBytes = secp256k1.getPublicKey(pkCompressedHex);
  // console.log("pkfull length", pkFullBytes.length);

  // const pkFullHex = ut.bytesToHex(pkFullBytes);
  // console.log("pk compressed:", pkCompressedHex, "pk uncompressed:", pkFullHex);
  // const pkFullHex2 = secp256k1.ProjectivePoint.fromPrivateKey(
  //   pkFullBytes.slice(1) // there's a leading padding bit?
  // ).toHex(false);

  // console.log("pk uncompressed2: ", pkFullHex2);




  // console.log("controllerKeyId", identifier.controllerKeyId, "keys", );
  // const key2 = await agent.get({ kid: identifier.controllerKeyId as string });
  // console.log("pks", pks);

  // issuer comes from `credential.issuer.id` (the eth pub key?)
  // const identifier = await context.agent.didManagerGet({ did: issuer });

  // using import { createVerifiableCredentialJwt } from 'did-jwt-vc';

  try {
    // const k = BigInt(1)
    // const k = BigInt("0x1AE67CFAF47490E0DE0D166DD1FCD5FF0C558E976296D64BA18D54505438933D");
    // const result = secp256k1.ProjectivePoint.BASE.multiply(k);
    // const result_aff = result.toAffine();
    // const result2 = secp256k1.ProjectivePoint.BASE.multiplyUnsafe(k);
    // const result2_aff = result2.toAffine();

    // console.log("Verification result: ", result.px, result.py, 'affine: ', result_aff.x, result_aff.y)
    // console.log("Verification result: ", result2.px, result2.py, 'affine: ', result2_aff.x, result2_aff.y)
    // console.log('result1 === result2', result.px === result2.px && result.py === result2.py, ' affine: ', result_aff.x === result2_aff.x && result_aff.y === result2_aff.y)

    // const _bits = secp256k1.nBitLength;
    // const wnaf = wNAF(Point, CURVE.endo ? Math.ceil(_bits / 2) : _bits);

    // if (result.x === secp256k1.ProjectivePoint.BASE.x
    //   && result.y === secp256k1.ProjectivePoint.BASE.y) {
    //     console.log('G * 1 matches')
    // }

    // const docVc = await agent.createVerifiableCredential({
    //   credential: {
    //     issuer: { id: identifier.did },
    //     credentialSubject: {
    //       agree: 'to disagree',
    //       foo: 'bar',
    //       signatories: ["0xa5b32d4387138b6a6f8995b961742b494bbfdfeb"]
    //     },
    //   },
    //   proofFormat: 'EthereumEip712Signature2021',
    // })
    
    // console.log('Doc VC', JSON.stringify(docVc, null))

    // const result = await agent.verifyCredential({ credential: docVc })
    // console.log("Verification result: ", result)

    // const docHash = keccak256('0x' + docVc.proof.jwt.toString(16))
    // console.log('Doc hash', docHash)
    // const docHash = '0xfoobarbaz'
    // const sigVc = await agent.createVerifiableCredential({
    //   credential: {
    //     issuer: { id: identifier.did },
    //     credentialSubject: {
    //       documentHash: docHash,
    //     },
    //   },
    //   proofFormat: 'EthereumEip712Signature2021',
    // })
    // console.log('Signature VC', JSON.stringify(sigVc, null))




    // Successful in validating this sig:
    // const verifiableCredential = {
    //   "credentialSubject": {
    //     "you": "Rock",
    //     "id": "did:web:example.com"
    //   },
    //   "issuer": {
    //     "id": "did:ethr:sepolia:0x02c63efe3dc707f6e3d323f11e40cf07578b2ab9aee1635e6ee676f6da09f1598d"
    //   },
    //   "type": [
    //     "VerifiableCredential"
    //   ],
    //   "@context": [
    //     "https://www.w3.org/2018/credentials/v1"
    //   ],
    //   "issuanceDate": "2024-12-07T03:04:44.000Z",
    //   "proof": {
    //     "type": "JwtProof2020",
    //     "jwt": "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InlvdSI6IlJvY2sifX0sInN1YiI6ImRpZDp3ZWI6ZXhhbXBsZS5jb20iLCJuYmYiOjE3MzM1NDA2ODQsImlzcyI6ImRpZDpldGhyOnNlcG9saWE6MHgwMmM2M2VmZTNkYzcwN2Y2ZTNkMzIzZjExZTQwY2YwNzU3OGIyYWI5YWVlMTYzNWU2ZWU2NzZmNmRhMDlmMTU5OGQifQ.VEHlsQ7rF5Z5lDuQPZjSp2Tsd-QM0tSB5SWBmE_jZpoJw-qwrAFGMpFOiDqJzqqcXZCuUif-mJlxVhxeXCmbjA"
    //   }
    // };

    // Successful in validating this sig #2:
    // const verifiableCredential = {
    //   "credentialSubject": {
    //     "you": "Rock",
    //     "id": "did:web:example.com"
    //   },
    //   "issuer": {
    //     "id": "did:ethr:sepolia:0x02c63efe3dc707f6e3d323f11e40cf07578b2ab9aee1635e6ee676f6da09f1598d"
    //   },
    //   "type": [
    //     "VerifiableCredential"
    //   ],
    //   "@context": [
    //     "https://www.w3.org/2018/credentials/v1"
    //   ],
    //   "issuanceDate": "2024-12-12T17:23:40.000Z",
    //   "proof": {
    //     "type": "JwtProof2020",
    //     "jwt": "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InlvdSI6IlJvY2sifX0sInN1YiI6ImRpZDp3ZWI6ZXhhbXBsZS5jb20iLCJuYmYiOjE3MzQwMjQyMjAsImlzcyI6ImRpZDpldGhyOnNlcG9saWE6MHgwMmM2M2VmZTNkYzcwN2Y2ZTNkMzIzZjExZTQwY2YwNzU3OGIyYWI5YWVlMTYzNWU2ZWU2NzZmNmRhMDlmMTU5OGQifQ.VEHlsQ7rF5Z5lDuQPZjSp2Tsd-QM0tSB5SWBmE_jZpom4Z7KNHlAkWyWF2go-Hklx2sD9xWFYV-Rr_pjjpRP_Q"
    //   }
    // }

    // Successful in validating this sig #3:
    // const verifiableCredential ={
    //   "credentialSubject": {
    //     "you": "Rock",
    //     "id": "did:web:example.com"
    //   },
    //   "issuer": {
    //     "id": "did:ethr:sepolia:0x02c63efe3dc707f6e3d323f11e40cf07578b2ab9aee1635e6ee676f6da09f1598d"
    //   },
    //   "type": [
    //     "VerifiableCredential"
    //   ],
    //   "@context": [
    //     "https://www.w3.org/2018/credentials/v1"
    //   ],
    //   "issuanceDate": "2024-12-12T18:32:02.000Z",
    //   "proof": {
    //     "type": "JwtProof2020",
    //     "jwt": "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InlvdSI6IlJvY2sifX0sInN1YiI6ImRpZDp3ZWI6ZXhhbXBsZS5jb20iLCJuYmYiOjE3MzQwMjgzMjIsImlzcyI6ImRpZDpldGhyOnNlcG9saWE6MHgwMmM2M2VmZTNkYzcwN2Y2ZTNkMzIzZjExZTQwY2YwNzU3OGIyYWI5YWVlMTYzNWU2ZWU2NzZmNmRhMDlmMTU5OGQifQ.VEHlsQ7rF5Z5lDuQPZjSp2Tsd-QM0tSB5SWBmE_jZpobbzDaKg1GPoAtZLBeoWwdNfjTxiyhyY08iYw3mCV4rg"
    //   }
    // }

    // A jwt with highS that needs normalizing:
    // const verifiableCredential = {
    //   "credentialSubject": {
    //     "you": "Rock",
    //     "id": "did:web:example.com"
    //   },
    //   "issuer": {
    //     "id": "did:ethr:sepolia:0x02c63efe3dc707f6e3d323f11e40cf07578b2ab9aee1635e6ee676f6da09f1598d"
    //   },
    //   "type": [
    //     "VerifiableCredential"
    //   ],
    //   "@context": [
    //     "https://www.w3.org/2018/credentials/v1"
    //   ],
    //   "issuanceDate": "2024-12-12T18:39:40.000Z",
    //   "proof": {
    //     "type": "JwtProof2020",
    //     "jwt": "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InlvdSI6IlJvY2sifX0sInN1YiI6ImRpZDp3ZWI6ZXhhbXBsZS5jb20iLCJuYmYiOjE3MzQwMjg3ODAsImlzcyI6ImRpZDpldGhyOnNlcG9saWE6MHgwMmM2M2VmZTNkYzcwN2Y2ZTNkMzIzZjExZTQwY2YwNzU3OGIyYWI5YWVlMTYzNWU2ZWU2NzZmNmRhMDlmMTU5OGQifQ.VEHlsQ7rF5Z5lDuQPZjSp2Tsd-QM0tSB5SWBmE_jZppghPpee_pZyzigqsUCeWV9J0rt8SI2oS7uhjm1JaLrww"
    //   }
    // };

    // My Veramo VC:
    // const verifiableCredential = JSON.parse('{"issuer":{"id":"did:ethr:sepolia:0x02c63efe3dc707f6e3d323f11e40cf07578b2ab9aee1635e6ee676f6da09f1598d"},"credentialSubject":{"agree":"to disagree","foo":"bar","signatories":["0xa5b32d4387138b6a6f8995b961742b494bbfdfeb"]},"issuanceDate":"2025-01-14T00:47:01.538Z","@context":["https://www.w3.org/2018/credentials/v1"],"type":["VerifiableCredential"],"proof":{"verificationMethod":"did:ethr:sepolia:0x02c63efe3dc707f6e3d323f11e40cf07578b2ab9aee1635e6ee676f6da09f1598d#controller","created":"2025-01-14T00:47:01.538Z","proofPurpose":"assertionMethod","type":"EthereumEip712Signature2021","proofValue":"0x279051dcaadcd3fbec8e446d9820fa6756bfac67d1aa8885b6db4a76241bd279160352b28f2bb5a523ab842204fddc98cc91ab138f2cd8496eac60ddcbd796ee1b","eip712":{"domain":{"chainId":11155111,"name":"VerifiableCredential","version":"1"},"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"}],"CredentialSubject":[{"name":"agree","type":"string"},{"name":"foo","type":"string"},{"name":"signatories","type":"string[]"}],"Issuer":[{"name":"id","type":"string"}],"Proof":[{"name":"created","type":"string"},{"name":"proofPurpose","type":"string"},{"name":"type","type":"string"},{"name":"verificationMethod","type":"string"}],"VerifiableCredential":[{"name":"@context","type":"string[]"},{"name":"credentialSubject","type":"CredentialSubject"},{"name":"issuanceDate","type":"string"},{"name":"issuer","type":"Issuer"},{"name":"proof","type":"Proof"},{"name":"type","type":"string[]"}]},"primaryType":"VerifiableCredential"}}}');
    // Jerry's VC:
    // const verifiableCredential = JSON.parse('{"id":"c7b19a48-b664-425d-ae24-5e42dcf943bf","issuer":{"id":"did:pkh:eip155:1:0x1e8564A52fc67A68fEe78Fc6422F19c07cFae198"},"@context":["https://www.w3.org/2018/credentials/v1"],"type":["VerifiableCredential","SignedAgreement"],"issuanceDate":"2025-01-13T18:04:28.879Z","credentialSubject":{"id":"did:pkh:eip155:1:0x1e8564A52fc67A68fEe78Fc6422F19c07cFae198","documentHash":"0x8964d34dda2371369e03231148a9fcc3c29d991ed68967690f11e2eca92c3ecd","timeStamp":"2025-01-13T18:04:28.880Z"},"proof":{"verificationMethod":"did:pkh:eip155:1:0x1e8564A52fc67A68fEe78Fc6422F19c07cFae198#blockchainAccountId","created":"2025-01-13T18:04:28.879Z","proofPurpose":"assertionMethod","type":"EthereumEip712Signature2021","proofValue":"0x410938df9302264517da4aa2874d2fcc82553a115b500ef90356df6c6df939537784eee09d113b1a1bc7c3cb00b900a37e8e45d0901e11bf3f1430f6182be3ad1c","eip712":{"domain":{"chainId":1,"name":"VerifiableCredential","version":"1"},"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"}],"CredentialSubject":[{"name":"documentHash","type":"string"},{"name":"id","type":"string"},{"name":"timeStamp","type":"string"}],"Issuer":[{"name":"id","type":"string"}],"Proof":[{"name":"created","type":"string"},{"name":"proofPurpose","type":"string"},{"name":"type","type":"string"},{"name":"verificationMethod","type":"string"}],"VerifiableCredential":[{"name":"@context","type":"string[]"},{"name":"credentialSubject","type":"CredentialSubject"},{"name":"id","type":"string"},{"name":"issuanceDate","type":"string"},{"name":"issuer","type":"Issuer"},{"name":"proof","type":"Proof"},{"name":"type","type":"string[]"}]},"primaryType":"VerifiableCredential"}}}');
    
    const types = {
      // Base EIP-712 domain type
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" }
      ],
      AgreementCredential: [
          { name: "@context", type: "string[]" },
          { name: "id", type: "string" },
          { name: "type", type: "string[]" },
          { name: "issuer", type: "Issuer" },
          { name: "issuanceDate", type: "string" },
          { name: "expirationDate", type: "string" },
          { name: "credentialSubject", type: "CredentialSubject" }
      ],
      // Credential components
      Issuer: [
        { name: "id", type: "string" },
        { name: "name", type: "string" }
      ],
    
      CredentialSubject: [
        { name: "id", type: "string" },
        { name: "agreement", type: "Agreement" }
      ],
    
      Proof: [
        { name: "type", type: "string" },
        { name: "created", type: "string" },
        { name: "proofPurpose", type: "string" },
        { name: "verificationMethod", type: "string" },
        { name: "eip712", type: "EIP712Proof" },
        { name: "proofValue", type: "string" }
      ],
    
      EIP712Proof: [
        { name: "domain", type: "EIP712Domain" },
        { name: "types", type: "TypeDefinition[]" },
        { name: "primaryType", type: "string" }
      ],
    
      TypeDefinition: [
        { name: "name", type: "string" },
        { name: "type", type: "string" }
      ],
    
      // Agreement structure
      Agreement: [
        { name: "metadata", type: "Metadata" },
        { name: "variables", type: "Variable[]" },
        { name: "content", type: "Content" },
        { name: "execution", type: "Execution" }
      ],
    
      Metadata: [
        { name: "id", type: "string" },
        { name: "templateId", type: "string" },
        { name: "version", type: "string" },
        { name: "createdAt", type: "string" },
        { name: "name", type: "string" },
        { name: "author", type: "string" },
        { name: "description", type: "string" }
      ],
    
      Variable: [
        { name: "id", type: "string" },
        { name: "type", type: "string" },
        { name: "name", type: "string" },
        { name: "description", type: "string" },
        { name: "value", type: "string" },
        { name: "defaultValue", type: "string" },
        { name: "validation", type: "Validation" }
      ],
    
      Validation: [
        { name: "required", type: "bool" },
        { name: "minLength", type: "uint256" },
        { name: "maxLength", type: "uint256" },
        { name: "pattern", type: "string" },
        { name: "message", type: "string" },
        { name: "min", type: "uint256" },
        { name: "max", type: "uint256" }
      ],
    
      Content: [
        { name: "type", type: "string" },
        { name: "data", type: "string" }
      ],
    
      Execution: [
        { name: "type", type: "string" },
        { name: "data", type: "ExecutionData" }
      ],
    
      ExecutionData: [
        { name: "states", type: "string[]" },
        { name: "inputs", type: "Input[]" },
        { name: "transitions", type: "Transition[]" }
      ],
    
      Input: [
        { name: "id", type: "string" },
        { name: "type", type: "string" },
        { name: "schema", type: "string" },
        { name: "displayName", type: "string" },
        { name: "description", type: "string" },
        { name: "value", type: "string" },
        { name: "signer", type: "string" }
      ],
    
      Transition: [
        { name: "from", type: "string" },
        { name: "to", type: "string" },
        { name: "conditions", type: "Condition[]" }
      ],
    
      Condition: [
        { name: "type", type: "string" },
        { name: "inputs", type: "string[]" }
      ]
    };

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
            validation: {
              required: true,
              minLength: 1
            }
          },
          {
            id: "grantAmount",
            type: "number",
            name: "Grant Amount",
            description: "Amount of tokens to be granted",
            value: 100000,
            validation: {
              required: true,
              min: 0
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
              pattern: "^0x[a-fA-F0-9]{40}$"
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
                  isApproved: true
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
                  isApproved: true
                },
                signer: "${tokenAllocatorAddress}"
              }
            },
            // transitions: [
            //   {
            //     from: "AWAITING_SIGNATURES",
            //     to: "ACTIVE_PENDING_REVIEW",
            //     conditions: [
            //       {
            //         type: "isValid",
            //         inputs: ["grantRecipientSignature"]
            //       }
            //     ]
            //   },
            //   {
            //     from: "ACTIVE_PENDING_REVIEW",
            //     to: "APPROVED",
            //     conditions: [
            //       {
            //         type: "isValid",
            //         inputs: ["workApprovedSignature"]
            //       }
            //     ]
            //   }
            // ]
          }
        }
      },
    };
  
    // const signedCredential = await credentialIssuerEIP712.createVerifiableCredentialEIP712(
    //   credential
    // );

    const agreementVc = await agent.createVerifiableCredential({
      credential: {
        issuer: { id: identifier.did },
        credentialSubject,
        type: ['VerifiableCredential','AgreementCredential'],
      },
      // proofFormat: 'JwtProof2020',
      proofFormat: 'EthereumEip712Signature2021',
      // eip712Types: types,
    });

    const result2 = await agent.verifyCredential({ credential: agreementVc })
    console.log("Verification result: ", result2)
  } catch(e) {
    console.error("Error", e)
  }
}

main().catch(console.log)