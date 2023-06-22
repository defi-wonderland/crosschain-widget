import { getConstants } from "~/config/constants";
// import { SdkBase } from "@connext/sdk";
import { getConnextSdkConfig } from "./getConnextSdkConfig";
import { SdkBase } from "~/connext";

interface EstimateRelayerFeeProps {
  originChain: string;
  destinyChain: string;
  createSafe: boolean;
  txGasLimit: number;
}

export const estimateRelayerFee = async ({
  originChain,
  destinyChain,
  createSafe,
  txGasLimit,
}: EstimateRelayerFeeProps) => {
  const { Chains, relayerFeeBoost, SETUP_SAFE_GAS_LIMIT } = getConstants();

  const config = await getConnextSdkConfig();
  const sdkBase = await SdkBase.create(config);

  const txDomains = {
    originDomain: Chains[originChain].domainId.toString(),
    destinationDomain: Chains[destinyChain].domainId.toString(),
    callDataGasAmount: createSafe
      ? txGasLimit + SETUP_SAFE_GAS_LIMIT
      : txGasLimit,
  };
  const relayerFeeSdk = await sdkBase.estimateRelayerFee(txDomains);
  const boostedRelayerFee = relayerFeeSdk.mul(relayerFeeBoost).div(100);

  return boostedRelayerFee.toString();
};
