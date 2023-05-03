export interface TxData {
  name: string;
  to: string;
  value: string;
  calldata: string;
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
