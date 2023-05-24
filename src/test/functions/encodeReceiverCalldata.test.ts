import { utils } from "ethers";

import { WethAddress } from "../__mocks__/abi";
import { encodeReceiverCallData } from "~/utils";

describe("encodeReceiverCallData", () => {
  it("should return the encoded parameters for a Call operation", () => {
    const to = WethAddress;
    const value = "0x00";
    const data = "0x00";

    const result = encodeReceiverCallData(to, value, data);

    const expectedParams = utils.defaultAbiCoder.encode(
      ["address", "uint256", "bytes", "uint8"],
      [to, value, data, 0]
    );

    expect(result).toEqual(expectedParams);
  });

  it("should return the encoded parameters for a DelegateCall operation", () => {
    const to = WethAddress;
    const value = "0x00";
    const data = "0x00";
    const operation = 1;

    const result = encodeReceiverCallData(to, value, data, operation);

    const expectedParams = utils.defaultAbiCoder.encode(
      ["address", "uint256", "bytes", "uint8"],
      [to, value, data, operation]
    );

    expect(result).toEqual(expectedParams);
  });
});
