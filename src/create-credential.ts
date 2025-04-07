import { agent } from './veramo/setup.js'
import { types } from './EIP712-types.js'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const agreement2 = JSON.parse(readFileSync(join(__dirname, 'grant-agreement.md.dfsm.json'), 'utf-8'));

function ensureValidationFields(obj: any) {
  if (Array.isArray(obj)) {
    obj.forEach(item => ensureValidationFields(item));
  } else if (typeof obj === 'object' && obj !== null) {
    // Convert all numeric values to strings
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'number') {
        obj[key] = obj[key].toString();
      }
    });

    // If this is a validation object, ensure all fields have values
    if ('validation' in obj) {
      const validation = obj.validation;
      const requiredFields = ['required', 'message', 'minLength', 'maxLength', 'pattern', 'min', 'max'];
      
      requiredFields.forEach(field => {
        if (!(field in validation)) {
          validation[field] = field === 'required' ? 'true' : 
                            field === 'message' ? '' : 
                            field === 'minLength' || field === 'maxLength' || field === 'min' || field === 'max' ? '0' : '';
        } else if (typeof validation[field] === 'number') {
          validation[field] = validation[field].toString();
        }
      });
    }
    
    // Recursively process all properties
    Object.values(obj).forEach(value => ensureValidationFields(value));
  }
}

// Ensure all validation fields have values
ensureValidationFields(agreement2);

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

    // Save the VC to a file
    const vcFileName = `vc-grant-agreement.md.dfsm.json`;
    writeFileSync(join(__dirname, vcFileName), JSON.stringify(agreementVc, null, 2));
    console.log(`Saved VC to ${vcFileName}`);

    const result2 = await agent.verifyCredential({ credential: agreementVc })
    console.log("Verification result: ", result2)
  } catch(e) {
    console.error("Error", e)
  }
}

main().catch(console.log)