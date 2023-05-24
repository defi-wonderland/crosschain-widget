import { Interface } from "ethers/lib/utils";

import {
  WethAbi,
  WethAbiFromSafe,
  WethAddress,
  depositCalldata,
} from "../__mocks__/abi";
import {
  encodeFunction,
  getContractAbi,
  getFirstWritableMethod,
} from "~/utils";

describe("encodeFunction", () => {
  it("should return the expected result when encoding the function", () => {
    const expectedValue = depositCalldata;
    const contractInterface = new Interface(WethAbi);
    const method = getFirstWritableMethod(contractInterface.functions)[1];
    const paramsArray = [WethAddress, "10000000000"];

    const result = encodeFunction(contractInterface, method, paramsArray);

    expect(result).toEqual(expectedValue);
  });

  it("should return an empty string when an error occurs", () => {
    const contractInterface = new Interface(WethAbi);
    const method = getFirstWritableMethod(contractInterface.functions)[1];
    const paramsArray = ["", "1000000000"];

    const result = encodeFunction(contractInterface, method, paramsArray);

    expect(result).toEqual("");
  });

  describe("getContractAbi", () => {
    it("should return the contract ABI", async () => {
      const chain = "mainnet";

      const result = await getContractAbi(chain, WethAddress);

      expect(result).toEqual(WethAbiFromSafe);
    });

    it("should return an empty string when an error occurs", async () => {
      const chain = "invalidChain";

      const result = await getContractAbi(chain, WethAddress);

      expect(result).toEqual("");
    });
  });
});
