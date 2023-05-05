import { getConstants } from "~/config";

export const getChainKey = (chainId: number): string => {
  const { Chains } = getConstants();
  const decostructedChains = Object.entries(Chains);

  const chainName = decostructedChains.filter(
    ([key, value]) => value.id === chainId
  );

  return chainName[0][0];
};
