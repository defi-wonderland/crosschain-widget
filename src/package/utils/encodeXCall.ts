import { Interface } from "ethers/lib/utils.js";

import { XCALL_ABI } from "~/config";

export const encodeXCall = (params: string[]) => {
  const contract = new Interface(XCALL_ABI);
  const encondedData = contract.encodeFunctionData("xcall", params);
  return encondedData;
};
