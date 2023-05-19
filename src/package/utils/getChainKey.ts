import { getConstants } from "~/config";

export const getChainKey = (chainId: number): string => {
  try {
    const { Chains } = getConstants();
    const decostructedChains = Object.entries(Chains);
    const chainName = decostructedChains.filter(
      ([, value]) => value.id === chainId
    );

    return chainName[0][0];
  } catch (error) {
    return "";
  }
};
