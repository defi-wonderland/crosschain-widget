export interface TxData {
  to: string;
  value: string;
  data: string;
  name?: string;
  calldatas?: Calldata[];
  from?: string;
}

export interface Calldata {
  type: string;
  value: string;
}

// See: https://docs.connext.network/developers/reference/contracts/calls#xcall
export interface XCallData {
  destination: string;
  to: string;
  asset: string;
  delegate: string;
  amount: string;
  slippage: string;
  callData: string;
}

export interface Tx {
  to: string;
  from?: string;
  value: string;
  data: string;
}
