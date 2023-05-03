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
      domainId: number;
      connextContract: string;
      assets?: {
        [key: string]: string;
      };
    };
  };
}

export interface Config extends Env, Constants {}
