import { vi } from "vitest";
import { ethers } from "ethers";

import { getConstants } from "~/config";
import { estimateRelayerFee } from "~/utils";

const gasPrice = 100;

const mockResult = {
  toNumber: vi.fn(() => gasPrice),
};

vi.mock("ethers", () => ({
  ethers: {
    providers: {
      JsonRpcProvider: vi.fn().mockImplementation(() => ({
        getGasPrice: vi.fn().mockResolvedValue(mockResult),
      })),
    },
  },
}));

describe("estimateRelayerFee", () => {
  it("should calculate the correct relayer fee", async () => {
    const { XCALL_GAS_LIMIT, CONNEXT_BUMP } = getConstants();
    const chainName = "ethereum";
    const GelatoAndPremium = getConstants().Chains[chainName].gelatoPremiumFee!;
    const createSafe = false;

    const relayerFee = await estimateRelayerFee(
      new ethers.providers.JsonRpcProvider(),
      chainName,
      createSafe
    );

    const expectedRelayerFee =
      gasPrice * XCALL_GAS_LIMIT * (1 + GelatoAndPremium + CONNEXT_BUMP) * 1.5;

    expect(relayerFee).toEqual(expectedRelayerFee);
  });
});
