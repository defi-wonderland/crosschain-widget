import { ethers } from "ethers";

interface Initializer {
  /* Dynamic values */
  owners: string[];
  threshold: number;
  to: string;

  /* Fixed values: */
  data: string;
  fallbackHandler: string;
  paymentToken: string;
  payment: number;
  paymentReceiver: string;
}

interface InitializerParams {
  owners: string[];
  threshold: number;
  connextFactory: string;
}

export function encodeInitializer({
  owners,
  threshold,
  connextFactory,
}: InitializerParams) {
  const initializer: Initializer = {
    owners,
    threshold,
    to: connextFactory,
    data: "0x0f7e4ebc", // abi.encodeWithSignature('enableModuleFromFactory()');
    fallbackHandler: "0x0000000000000000000000000000000000000000",
    paymentToken: "0x0000000000000000000000000000000000000000",
    payment: 0,
    paymentReceiver: "0x0000000000000000000000000000000000000000",
  };

  const abiCoder = new ethers.utils.AbiCoder();
  const encodedData = abiCoder.encode(
    [
      "address[]",
      "uint256",
      "address",
      "bytes",
      "address",
      "address",
      "uint256",
      "address",
    ],
    [
      initializer.owners,
      initializer.threshold,
      initializer.to,
      initializer.data,
      initializer.fallbackHandler,
      initializer.paymentToken,
      initializer.payment,
      initializer.paymentReceiver,
    ]
  );

  return `0xb63e800d${encodedData.slice(2)}`;
}
