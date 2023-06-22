import { providers } from "ethers";
import { getConstants } from "~/config";

const { Chains } = getConstants();

export const getAlchemyProvider = (chainName: string, apiKey: string) => {
  return new providers.AlchemyProvider(Chains[chainName].id, apiKey);
};

export const getInfuraProvider = (chainName: string, apiKey: string) => {
  return new providers.InfuraProvider(Chains[chainName].id, apiKey);
};

export const getPublicProvider = (chainName: string) => {
  return new providers.JsonRpcProvider(
    Chains[chainName].publicRpcProvider,
    Chains[chainName].id
  );
};

export const getDestinationProvider = (
  chainName: string,
  alchemyKey?: string,
  infuraKey?: string
) => {
  if (alchemyKey) {
    return getAlchemyProvider(chainName, alchemyKey);
  } else if (infuraKey) {
    return getInfuraProvider(chainName, infuraKey);
  } else {
    return getPublicProvider(chainName);
  }
};
