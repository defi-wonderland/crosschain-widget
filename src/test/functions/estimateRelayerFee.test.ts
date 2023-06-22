import { vi } from "vitest";
import { BigNumber } from "ethers";

import { estimateRelayerFee } from "~/utils";

const relayerFee = BigNumber.from(100);

vi.mock("~/connext", async () => {
  const actual: any = await vi.importActual("~/connext");

  return {
    ...actual,
    SdkBase: {
      create: vi.fn(() => ({
        estimateRelayerFee: vi.fn(() => relayerFee),
      })),
    },
  };
});

describe("estimateRelayerFee", () => {
  it("should calculate the correct relayer fee", async () => {
    const originChain = "ethereum";
    const destinyChain = "polygon";
    const createSafe = false;
    const txGasLimit = 100;

    const relayerFee = await estimateRelayerFee({
      originChain,
      destinyChain,
      createSafe,
      txGasLimit,
    });

    // relayer fee (100) * boost (1.5) = 150
    const expectedRelayerFee = 150;

    expect(relayerFee).toEqual(expectedRelayerFee.toString());
  });
});
