import { ChainData } from "~/types";

export const getChainKey = (chainId: number, chainList: ChainData): string => {
  try {
    const decostructedChains = Object.entries(chainList);
    const chainName = decostructedChains.filter(
      ([, value]) => value.id === chainId
    );

    return chainName[0][0];
  } catch (error) {
    return "";
  }
};
