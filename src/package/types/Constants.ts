export interface Env {
  ALLOW_DEV_MODE: boolean;
  INFURA_KEY: string;
  ETHERSCAN_KEY: string;
}

export interface Constants {
  SETUP_SAFE_GAS_LIMIT: number;

  relayerFeeBoost: number;
  Chains: ChainData;
  AVAILABLE_ORIGIN_NETWORKS: string[];
  AVAILABLE_DESTINY_NETWORKS: string[];

  TESTNET_AVAILABLE_ORIGIN_NETWORKS: string[];
  TESTNET_AVAILABLE_DESTINY_NETWORKS: string[];
}

export interface ChainData {
  [key: string]: {
    safeIdentifier?: string | undefined;
    name: string;
    id: number;
    domainId: number;
    connextContract: string;
    ZCMFactory: string;
    safeMasterCopy: string;
    multicallAddress: string;
    assets: {
      [key: string]: string;
    };
    publicRpcProvider: string;
  };
}

export interface Config extends Env, Constants {}
