import { encodeInitializer } from "~/utils";
import { validInitializerResult } from "../__mocks__/receive";

describe("encodeInitializer", () => {
  it("should return the encoded data", () => {
    const params = {
      owners: ["0xbe6D2b769119E8515F8376a1D7878523DFDECf7B"],
      threshold: 1,
      connextFactory: "0xf1a0a24acEB56D6F3E954ae6592941eE25ddb53F",
    };

    const result = encodeInitializer(params);

    expect(result).toEqual(validInitializerResult);
  });
});
