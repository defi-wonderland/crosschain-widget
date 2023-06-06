import { ethers } from "ethers";

interface SafeData {
  singleton: string;
  initializer: string;
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
  initializer: string;
}

export function encodeCreateSafe({
  userAddress,
  originDomainId,
  destinationConnext,
  destinationSafeMasterCopy,
  safeTransactionData,
  saltNonce1,
  saltNonce2,
  initializer,
}: CreateSafeParams) {
  const safeData: SafeData = {
    singleton: destinationSafeMasterCopy,
    initializer: initializer,
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
      "tuple(address singleton, bytes initializer, uint256 saltNonce)",
      "tuple(address,uint32,address,uint256)",
      "bytes",
    ],
    [Object.values(safeData), Object.values(moduleData), safeTransactionData]
  );

  return encodedData;
}
