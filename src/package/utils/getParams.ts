import { FunctionFragment } from "ethers/lib/utils";

export const getParams = (method: FunctionFragment, paramsArray: string[]) => {
  return method.inputs.map((inputParam, index) => {
    return { type: inputParam.type, value: paramsArray[index] };
  });
};
