import { Calldata, TxData } from "~/types";

export const getRedeableData = (data: TxData) => {
  let calldatasString = "";

  if (data?.calldatas) {
    calldatasString = data?.calldatas
      .map(({ type, value }: Calldata) => `${type}: ${value}`)
      .join("\n");
  }

  return `Signature: 
${data?.name}

Calldatas: 
${calldatasString || data?.data.slice(10)}`;
};
