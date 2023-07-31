import { deployFromFactory, requireEnv } from "../hardhat/utils";

/*
    *******************************************************************************************
    1. Set the VERIFIER_CONTRACT_NAME - e.g PlonkeVerifyFull
    *******************************************************************************************
    NB: use the verifier.address output as input for scripts/deployment/setVerifierAddress.ts 
    *******************************************************************************************
    npx hardhat run --network zkevm_dev scripts/deployment/deployVerifier.ts
    *******************************************************************************************
*/

async function main() {
  const verifierContractName = requireEnv("VERIFIER_CONTRACT_NAME");

  // PLONK VERIFIER
  const verifier = await deployFromFactory(verifierContractName);
  console.log(`${verifierContractName} deployed at ${verifier.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
