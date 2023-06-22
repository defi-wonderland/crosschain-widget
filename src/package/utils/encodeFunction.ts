import { FunctionFragment, Interface } from "ethers/lib/utils";

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
