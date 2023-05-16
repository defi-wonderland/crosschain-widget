import { Interface } from "ethers/lib/utils.js";

import { XCALL_ABI } from "~/config";
import { getParams } from "./getParams";

export const encodeXCall = (params: string[]) => {
  const contract = new Interface(XCALL_ABI);
  const method = Object.entries(contract.functions);
  let encodedData = "0x";

  try {
    encodedData = contract.encodeFunctionData("xcall", params);
  } catch (error) {
    console.log("error encoding xcall function");
  }

  return {
    encodedData,
    params: getParams(method[0][1], params),
    signature: method[0][0],
  };
};
