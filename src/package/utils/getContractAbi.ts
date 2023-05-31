import { fetchData, getContractAbiUrl } from "./fetchData";

export const getContractAbi = async (
  chain: string,
  contractAddress: string
) => {
  try {
    const chainName = chain === "ethereum" ? "mainnet" : chain;
    const url = getContractAbiUrl(chainName, contractAddress);
    const jsonData = await fetchData(url);
    return JSON.stringify(jsonData.contractAbi.abi);
  } catch (error) {
    console.error(error);
    return "";
  }
};
