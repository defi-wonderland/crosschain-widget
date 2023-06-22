import { Tx, TxData } from "~/types";

export const getTransactionJson = (data: TxData): Tx => {
  return {
    to: data.to,
    from: data.from,
    value: data.value,
    data: data.data,
  };
};
