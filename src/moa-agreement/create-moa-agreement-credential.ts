import { agent } from '../veramo/setup.js'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const agreement = JSON.parse(readFileSync(join(__dirname, 'moa-agreement.md.dfsm.json'), 'utf-8'));
const partyAInput = JSON.parse(readFileSync(join(__dirname, 'moa-agreement-input-partyA.md.dfsm.json'), 'utf-8'));
const partyBInput = JSON.parse(readFileSync(join(__dirname, 'moa-agreement-input-partyB.md.dfsm.json'), 'utf-8'));

async function main() {
  const partyA = await agent.didManagerGetByAlias({ alias: 'partyA' })
  const partyB = await agent.didManagerGetByAlias({ alias: 'partyB' })

  try {
    // the maching credentialSubject
    const credentialSubject = {
      id: "did:example:grant-recipient-1",
      agreement: Buffer.from(JSON.stringify(agreement)).toString('base64'),
    };

    const agreementVc = await agent.createVerifiableCredential({
      credential: {
        issuer: { id: partyA.did },
        credentialSubject,
        type: ['VerifiableCredential','AgreementCredential'],
      },
      // proofFormat: 'JwtProof2020',
      proofFormat: 'EthereumEip712Signature2021',
      // This is utilizing one of our veramo lib patches to supply the EIP-712 model definition directly,
      // instead of attemping to auto-generate it.
      // eip712Types: types,
    });

    // Save the VC to a file
    const vcFileName = `vc-grant-agreement.md.dfsm.json`;
    writeFileSync(join(__dirname, vcFileName), JSON.stringify(agreementVc, null, 2));
    console.log(`Saved VC to ${vcFileName}`);

    // const result2 = await agent.verifyCredential({ credential: agreementVc })
    // console.log("Verification result: ", result2)

    const partyAVc = await agent.createVerifiableCredential({
      credential: {
        issuer: { id: partyA.did },
        credentialSubject: partyAInput,
        type: ['VerifiableCredential','AgreementCredential'],
      },
      proofFormat: 'EthereumEip712Signature2021',
    });
    // console.log("PartyA VC: ", agreementVc);
    const partyAVcFile = `vc-grant-agreemen-partyA-input.json`;
    writeFileSync(join(__dirname, partyAVcFile), JSON.stringify(partyAVc, null, 2));
    console.log(`Saved VC to ${partyAVcFile}`);

    const partyBVc = await agent.createVerifiableCredential({
      credential: {
        issuer: { id: partyB.did },
        credentialSubject: partyBInput,
        type: ['VerifiableCredential','AgreementCredential'],
      },
      proofFormat: 'EthereumEip712Signature2021',
    });
    // console.log("PartyB VC: ", agreementVc);
    const partyBVcFile = `vc-grant-agreemen-partyB-input.json`;
    writeFileSync(join(__dirname, partyBVcFile), JSON.stringify(partyBVc, null, 2));
    console.log(`Saved VC to ${partyBVcFile}`);
  } catch(e) {
    console.error("Error", e)
  }
}

main().catch(console.log)