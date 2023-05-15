import { Interface } from "ethers/lib/utils.js";

import { XCALL_ABI } from "~/config";
import { getParams } from "./getParams";

export const encodeXCall = (params: string[]) => {
  const contract = new Interface(XCALL_ABI);
  const encodedData = contract.encodeFunctionData("xcall", params);
  const method = Object.entries(contract.functions);

  return {
    encodedData,
    params: getParams(method[0][1], params),
    signature: method[0][0],
  };
};
