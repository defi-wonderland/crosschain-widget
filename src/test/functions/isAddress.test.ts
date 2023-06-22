import { isAddress } from "~/utils";

describe("isAddress", () => {
  it("should return true for a valid Ethereum address", () => {
    const address = "0x1234567890123456789012345678901234567890";
    const result = isAddress(address);

    expect(result).toBe(true);
  });

  it("should return false for an invalid Ethereum address", () => {
    const address = "0x123";
    const result = isAddress(address);

    expect(result).toBe(false);
  });
});
