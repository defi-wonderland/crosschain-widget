import { encodeCreateSafe } from "~/utils";
import { validCreateSafeResult } from "../__mocks__/receive";

describe("encodeCreateSafe", () => {
  it("should return the encoded data", () => {
    const params = {
      safeTransactionData: "0x",
      destinationConnext: "0x8898B472C54c31894e3B9bb83cEA802a5d0e63C6",
      destinationSafeMasterCopy: "0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552",
      originDomainId: 6648936,
      userAddress: "0xbe6D2b769119E8515F8376a1D7878523DFDECf7B",
      saltNonce1: "1",
      saltNonce2: "1",
      owners: ["0xbe6D2b769119E8515F8376a1D7878523DFDECf7B"],
      threshold: 1,
    };

    const result = encodeCreateSafe(params);
    expect(result).toEqual(validCreateSafeResult);
  });
});
