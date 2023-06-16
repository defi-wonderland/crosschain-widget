import { vi } from "vitest";
import { ethers } from "ethers";

import { getConstants } from "~/config";
import { estimateRelayerFee } from "~/utils";

const gasPrice = 100;

vi.mock("ethers", async () => {
  const actual: any = await vi.importActual("ethers");

  return {
    ...actual,
    ethers: {
      providers: {
        JsonRpcProvider: vi.fn().mockImplementation(() => ({
          getGasPrice: vi.fn(() => gasPrice),
        })),
      },
    },
  };
});

describe("estimateRelayerFee", () => {
  it("should calculate the correct relayer fee", async () => {
    const { XCALL_GAS_LIMIT, CONNEXT_BUMP, relayerFeeBoost } = getConstants();
    const chainName = "ethereum";
    const GelatoAndPremium = getConstants().Chains[chainName].gelatoPremiumFee!;
    const createSafe = false;

    const relayerFee = await estimateRelayerFee(
      new ethers.providers.JsonRpcProvider(),
      chainName,
      createSafe
    );

    const expectedRelayerFee =
      gasPrice *
      XCALL_GAS_LIMIT *
      (1 + GelatoAndPremium + CONNEXT_BUMP + relayerFeeBoost);

    expect(relayerFee).toEqual(expectedRelayerFee.toString());
  });
});
