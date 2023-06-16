import { providers, BigNumber } from "ethers";
import { getConstants } from "~/config/constants";

export const estimateRelayerFee = async (
  provider: providers.JsonRpcProvider,
  chainName: string,
  createSafe: boolean
) => {
  const {
    Chains,
    XCALL_GAS_LIMIT,
    SETUP_SAFE_GAS_LIMIT,
    CONNEXT_BUMP,
    relayerFeeBoost,
  } = getConstants();

  const gasLimit = createSafe ? SETUP_SAFE_GAS_LIMIT : XCALL_GAS_LIMIT;

  const gasPrice = await provider.getGasPrice();
  const GelatoAndPremium = Chains[chainName]?.gelatoPremiumFee || 0.2;

  const premium = (1 + GelatoAndPremium + CONNEXT_BUMP + relayerFeeBoost) * 100;
  const relayerFee = BigNumber.from(gasPrice)
    .mul(gasLimit)
    .mul(premium)
    .div(100);

  return relayerFee.toString();
};
