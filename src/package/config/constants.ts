import { Constants } from "~/types";

export const getConstants = (): Constants => {
  return {
    Chains: {
      mainnet: {
        name: "Ethereum",
        id: 1,
      },
      goerli: {
        name: "Goerli",
        id: 5,
      },
      arbitrum: {
        name: "Arbitrum",
        id: 42161,
      },
      optimism: {
        name: "Optimism",
        id: 10,
      },
    },
  };
};
