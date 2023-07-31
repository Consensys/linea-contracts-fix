import { ethers } from "hardhat";
import { OPERATOR_ROLE } from "../../test/utils/constants";

const main = async () => {
  const proxyAdminContract = "0xf2ee38C4047c8C086eDBA8d33585aD3Ccaa7F77e";

  const proxyContract = "0x70BaD09280FD342D02fe64119779BC1f0791BAC2";
  const NewImplementation = "0x7e8ed469581cA382ECf65a6960Eb08797536d00F";

  const accountGrantRevokeRole = "0x257aF1696C55470f91De5cfAf18F4F56FA58fa90";
  const pauseType = "0x0000000000000000000000000000000000000000000000000000000000000000";

  const days = 7;
  const delay = days * 24 * 3600;

  console.log("Delay is set to:", delay);

  const encodeUpgradeCall = ethers.utils.hexConcat([
    "0x99a88ec4",
    ethers.utils.defaultAbiCoder.encode(["address", "address"], [proxyContract, NewImplementation]),
  ]);

  console.log(encodeUpgradeCall);
  console.log("\n\n");
  const encodeUpgradeCall2 = ethers.utils.hexConcat([
    "0x01d5062a",
    ethers.utils.defaultAbiCoder.encode(
      ["address", "uint256", "bytes", "bytes32", "bytes32", "uint256"],
      [proxyAdminContract, 0, encodeUpgradeCall, ethers.constants.HashZero, ethers.constants.HashZero, delay],
    ),
  ]);

  console.log("Encoded TX Schedule Upgrade with", days, "day delay:", "\n", encodeUpgradeCall2);

  const encodeGrantRole = ethers.utils.hexConcat([
    "0x2f2ff15d",
    ethers.utils.defaultAbiCoder.encode(["bytes32", "address"], [OPERATOR_ROLE, accountGrantRevokeRole]),
  ]);

  console.log("encodeGrantRole:", "\n", encodeGrantRole);

  const encodeRevokeRole = ethers.utils.hexConcat([
    "0xd547741f",
    ethers.utils.defaultAbiCoder.encode(["bytes32", "address"], [OPERATOR_ROLE, accountGrantRevokeRole]),
  ]);

  console.log("encodeRevokeRole:", "\n", encodeRevokeRole);

  const encodePauseByType = ethers.utils.hexConcat([
    "0x8264bd82",
    ethers.utils.defaultAbiCoder.encode(["bytes32"], [pauseType]),
  ]);

  console.log("encodePauseByType:", "\n", encodePauseByType);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
