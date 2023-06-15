export interface Env {
  ALLOW_DEV_MODE: boolean;
  INFURA_KEY: string;
  ETHERSCAN_KEY: string;
}

export interface Constants {
  XCALL_GAS_LIMIT: number;
  SETUP_SAFE_GAS_LIMIT: number;
  CONNEXT_BUMP: number;

  relayerFeeBoost: number;

  Chains: {
    [key: string]: {
      safeIdentifier?: string;
      name: string;
      id: number;
      domainId: number;
      connextContract: string;
      ZCMFactory: string; // Zodiac Connext Module Factory
      safeMasterCopy: string;
      multicallAddress: string;
      gelatoPremiumFee?: number;
      assets: {
        [key: string]: string;
      };
      publicRpcProvider: string;
    };
  };
}

export interface Config extends Env, Constants {}
