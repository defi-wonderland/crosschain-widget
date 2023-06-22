import { FunctionFragment, Interface } from "ethers/lib/utils";

export const filterWritableMethods = (method: [string, FunctionFragment]) => {
  return (
    method[1].stateMutability === "payable" ||
    method[1].stateMutability === "nonpayable"
  );
};

export const getFirstWritableMethod = (methods: {
  [name: string]: FunctionFragment;
}) => {
  return Object.entries(methods).filter(filterWritableMethods)[0];
};

export const filterMethod = (contractInterface: Interface, method: string) => {
  return Object.entries(contractInterface.functions).filter(
    (key) => key[1].name === method
  )[0][1];
};
