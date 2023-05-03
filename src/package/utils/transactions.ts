import { FunctionFragment, Interface } from "ethers/lib/utils";
import { fetchData, getContractAbiUrl } from "./fetchData";

export const encodeFunction = (
  contractInterface: Interface,
  method: FunctionFragment,
  paramsArray: string[]
) => {
  try {
    return contractInterface.encodeFunctionData(method?.name, [...paramsArray]);
  } catch (error) {
    return "";
  }
};

export const getContractAbi = async (
  chain: string,
  contractAddress: string
) => {
  try {
    const url = getContractAbiUrl(chain, contractAddress);
    const jsonData = await fetchData(url);
    return JSON.stringify(jsonData.contractAbi.abi);
  } catch (error) {
    return "";
  }
};
