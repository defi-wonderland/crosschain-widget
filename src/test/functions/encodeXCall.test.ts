import { encodeXCall } from "~/utils";
import {
  invalidxCallParams,
  validxCallParams,
  validxCallResult,
} from "../__mocks__/xcall";

describe("encodeXCall", () => {
  it("should return the encoded data, params, and signature for an xcall", () => {
    const params = validxCallParams;

    const result = encodeXCall(params);

    expect(result.encodedData).toEqual(validxCallResult);
  });

  it("should return default values when an error occurs", () => {
    const params = invalidxCallParams;

    const result = encodeXCall(params);

    expect(result.encodedData).toEqual("0x");
  });
});
