import { ethers } from "ethers";

interface SafeData {
  singleton: string;
  owners: string[];
  threshold: number;
  saltNonce: string;
}

interface ModuleData {
  originSender: string;
  origin: number;
  connext: string;
  saltNonce: string;
}

interface CreateSafeParams {
  userAddress: string;
  originDomainId: number;
  destinationConnext: string;
  destinationSafeMasterCopy: string;
  safeTransactionData: string;
  saltNonce1: string;
  saltNonce2: string;
  owners: string[];
  threshold: number;
}

export function encodeCreateSafe({
  userAddress,
  originDomainId,
  destinationConnext,
  destinationSafeMasterCopy,
  safeTransactionData,
  saltNonce1,
  saltNonce2,
  owners,
  threshold,
}: CreateSafeParams) {
  const safeData: SafeData = {
    singleton: destinationSafeMasterCopy,
    owners,
    threshold,
    saltNonce: saltNonce1,
  };

  const moduleData: ModuleData = {
    originSender: userAddress,
    origin: originDomainId,
    connext: destinationConnext,
    saltNonce: saltNonce2,
  };

  const abiCoder = new ethers.utils.AbiCoder();
  const encodedData = abiCoder.encode(
    [
      "tuple(address singleton, address[] owners, uint256 threshold, uint256 saltNonce)",
      "tuple(address,uint32,address,uint256)",
      "bytes",
    ],
    [Object.values(safeData), Object.values(moduleData), safeTransactionData]
  );

  return encodedData;
}
