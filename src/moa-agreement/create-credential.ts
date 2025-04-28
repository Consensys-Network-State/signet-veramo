import { agent } from '../veramo/setup.js'
import fs, { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const outputDirName = "output";
const outputDir = `${__dirname}/${outputDirName}`;
if (!fs.existsSync(outputDir)){
  fs.mkdirSync(outputDir);
}
const agreement = JSON.parse(readFileSync(join(__dirname, 'agreement.md.dfsm.json'), 'utf-8'));
const partyAInput = JSON.parse(readFileSync(join(__dirname, 'input-partyA.json'), 'utf-8'));
const partyBInput = JSON.parse(readFileSync(join(__dirname, 'input-partyB.json'), 'utf-8'));
const partyAAcceptInput = JSON.parse(readFileSync(join(__dirname, 'input-partyA-accept.json'), 'utf-8'));
const partyARejectInput = JSON.parse(readFileSync(join(__dirname, 'input-partyA-reject.json'), 'utf-8'));

async function writeVc(params, name) {
  const vc = await agent.createVerifiableCredential(params);
  const isValid = await agent.verifyCredential({ credential: vc })
  if (!isValid) {
    throw new Error(`Generated an invalidl VC given params: ${JSON.stringify(params)}`);
  }
  // console.log("PartyA VC: ", JSON.stringify(vc));
  const filename = `${name}.json`;
  writeFileSync(join(outputDir, filename), JSON.stringify(vc, null, 2));
  console.log(`Saved VC to ./${outputDirName}/${filename}`);
  return { vc, filename };
}

const didStrToEthAddress = didStr => didStr.slice(didStr.lastIndexOf(":") + 1);

async function main() {
  const agreementCreator = await agent.didManagerGetByAlias({ alias: 'partyC' })
  const partyA = await agent.didManagerGetByAlias({ alias: 'partyA' })
  const partyB = await agent.didManagerGetByAlias({ alias: 'partyB' })
  const partyAEthAddress = didStrToEthAddress(partyA.did);
  const partyBEthAddress = didStrToEthAddress(partyB.did);

  try {
    const filenamePrefix = "simple.grant";
    const agreementParams = {
      credential: {
        issuer: { id: agreementCreator.did },
        credentialSubject: {
          id: "did:example:grant-recipient-1",
          agreement: Buffer.from(JSON.stringify(agreement)).toString('base64'),
          params: {
            partyAEthAddress,
          }
        },
        type: ['VerifiableCredential','AgreementCredential'],
      },
      // proofFormat: 'JwtProof2020',
      proofFormat: 'EthereumEip712Signature2021',
      // This is utilizing one of our veramo lib patches to supply the EIP-712 model definition directly,
      // instead of attemping to auto-generate it.
      // eip712Types: types,
    };
    await writeVc(agreementParams, `${filenamePrefix}.wrapped`);

    // making sure that we're referencing the right Eth address regardless of whose Veramo agent the script is running on
    partyAInput.values.partyBEthAddress = partyBEthAddress;
    const partyAInputParams = {
      credential: {
        issuer: { id: partyA.did },
        credentialSubject: partyAInput,
        type: ['VerifiableCredential','AgreementInputCredential'],
      },
      proofFormat: 'EthereumEip712Signature2021',
      // now: new Date('2025-04-14T13:55:57.321Z'), // fixing the timestamp to get a consistently hashing output
    };
    await writeVc(partyAInputParams, `${filenamePrefix}.partyA-input.wrapped`);

    const partyBInputParams = {
      credential: {
        issuer: { id: partyB.did },
        credentialSubject: partyBInput,
        type: ['VerifiableCredential','AgreementInputCredential'],
      },
      proofFormat: 'EthereumEip712Signature2021',
    };
    await writeVc(partyBInputParams, `${filenamePrefix}.partyB-input.wrapped`);

    const partyAAcceptParams = {
      credential: {
        issuer: { id: partyA.did },
        credentialSubject: partyAAcceptInput,
        type: ['VerifiableCredential','AgreementInputCredential'],
      },
      proofFormat: 'EthereumEip712Signature2021',
    };
    await writeVc(partyAAcceptParams, `${filenamePrefix}.partyA-input-accept.wrapped`);

    const partyARejectParams = {
      credential: {
        issuer: { id: partyA.did },
        credentialSubject: partyARejectInput,
        type: ['VerifiableCredential','AgreementInputCredential'],
      },
      proofFormat: 'EthereumEip712Signature2021',
    };
    await writeVc(partyARejectParams, `${filenamePrefix}.partyA-input-reject.wrapped`);
  } catch(e) {
    console.error("Error", e)
  }
}

main().catch(console.log)