// Values from : https://goerli-optimism.etherscan.io/tx/0x09c189b5600e86ff677fdafd544972681d1b67a26bd8bfc4004535f3e6666d44

/* 
  xCallParams:
    0: destination domaninId
    1: ZodiacConnextModule (temporary random address)
    2: asset
    3: delegate
    4: amount
    5: slippage
    6: callData
*/

export const validxCallParams = [
  "1735353714",
  "0xC55b9BE4B5959afeb1938e2A1498F69124042294",
  "0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF",
  "0x80B7064b28cD538FaD771465984aa799d87A1187",
  "0",
  "0",
  "0x000000000000000000000000b4fbf271143f4fbf7b91a5ded31805e42b2208d60000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044095ea7b300000000000000000000000080b7064b28cd538fad771465984aa799d87a1187000000000000000000000000000000000000000000000000000000000000004d00000000000000000000000000000000000000000000000000000000",
];

export const invalidxCallParams = [
  "1735353714",
  "0xC55b9BE4B5959afeb1938e2A1498F69124042294",
  "0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF",
  "0x80B7064b28cD538FaD771465984aa799d87A1187",
  "0",
  "0",
  "0",
];

export const validxCallResult =
  "0x8aac16ba00000000000000000000000000000000000000000000000000000000676f6572000000000000000000000000c55b9be4b5959afeb1938e2a1498f6912404229400000000000000000000000068db1c8d85c09d546097c65ec7dcbff4d6497cbf00000000000000000000000080b7064b28cd538fad771465984aa799d87a11870000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000b4fbf271143f4fbf7b91a5ded31805e42b2208d60000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044095ea7b300000000000000000000000080b7064b28cd538fad771465984aa799d87a1187000000000000000000000000000000000000000000000000000000000000004d00000000000000000000000000000000000000000000000000000000";
