export interface Env {
  ALLOW_DEV_MODE: boolean;
  INFURA_KEY: string;
  ETHERSCAN_KEY: string;
}

export interface Constants {
  Chains: {
    [key: string]: {
      name: string;
      id: number;
    };
  };
}

export interface Config extends Env, Constants {}
