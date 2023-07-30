import { ethers, upgrades } from "hardhat";

/*
    *******************************************************************************************

    *******************************************************************************************
    *******************************************************************************************
    npx hardhat run --network zkevm_dev scripts/deployment/deployImplementation.ts
    *******************************************************************************************
*/

async function main() {
  const factory = await ethers.getContractFactory("ZkEvmV2");

  console.log("Deploying V2 Contract...");
  const v2contract = await upgrades.deployImplementation(factory, {
    kind: "transparent",
  });

  console.log(v2contract);

  console.log(`Contract deployed at ${v2contract}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
