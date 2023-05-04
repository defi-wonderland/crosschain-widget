export interface Env {
  ALLOW_DEV_MODE: boolean;
  INFURA_KEY: string;
  ETHERSCAN_KEY: string;
}

export interface Constants {
  XCALL_GAS_LIMIT: number;
  CONNEXT_BUMP: number;
  Chains: {
    [key: string]: {
      name: string;
      id: number;
      domainId: number;
      connextContract: string;
      gelatoPremiumFee?: number;
      assets?: {
        [key: string]: string;
      };
    };
  };
}

export interface Config extends Env, Constants {}
