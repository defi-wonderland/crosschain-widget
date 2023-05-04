import { providers } from "ethers";
import { getConstants } from "~/config/constants";

export const estimateRelayerFee = async (
  provider: providers.JsonRpcProvider,
  chainName: string
) => {
  const { Chains, XCALL_GAS_LIMIT, CONNEXT_BUMP } = getConstants();

  const gasPrice = (await provider.getGasPrice()).toNumber();
  const GelatoAndPremium = Chains[chainName]?.gelatoPremiumFee || 0.2;
  const relayerFee =
    gasPrice * XCALL_GAS_LIMIT * (1 + GelatoAndPremium + CONNEXT_BUMP);

  return relayerFee;
};
