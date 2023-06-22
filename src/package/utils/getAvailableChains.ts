import { ChainData } from "~/types";

/* 
  This function takes in the list of all available chains and returns the list of chains that are available for the user to select.
  If the user is on the testnet, it will return the testnet chains, otherwise it will return the mainnet chains.
*/
export const getAvailableChains = (
  chains: ChainData,
  testnetChainList: string[],
  chainList: string[],
  testnet?: boolean
) => {
  const newChainList = { ...chains };
  removeInvalidChains(newChainList, testnet ? testnetChainList : chainList);
  return newChainList;
};

const removeInvalidChains = (
  chains: ChainData,
  availableChainList: string[]
) => {
  for (const key of Object.keys(chains)) {
    if (!availableChainList.includes(key)) {
      delete chains[key];
    }
  }
};
