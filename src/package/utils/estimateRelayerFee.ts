import { providers } from "ethers";
import { getConstants } from "~/config/constants";

export const estimateRelayerFee = async (
  provider: providers.JsonRpcProvider,
  chainName: string,
  createSafe: boolean
) => {
  const { Chains, XCALL_GAS_LIMIT, SETUP_SAFE_GAS_LIMIT, CONNEXT_BUMP } =
    getConstants();

  const gasLimit = createSafe ? SETUP_SAFE_GAS_LIMIT : XCALL_GAS_LIMIT;

  const gasPrice = (await provider.getGasPrice()).toNumber();
  const GelatoAndPremium = Chains[chainName]?.gelatoPremiumFee || 0.2;
  const relayerFee =
    gasPrice * gasLimit * (1 + GelatoAndPremium + CONNEXT_BUMP);

  // remove any decimals
  return Math.ceil(relayerFee);
};
