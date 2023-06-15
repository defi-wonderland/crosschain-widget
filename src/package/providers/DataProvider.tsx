import { createContext, useState, useContext, useEffect } from "react";
import { providers } from "ethers";

import {
  getAvailableChains,
  getChainKey,
  getDestinationProvider,
} from "~/utils";
import { ChainData, TxData } from "~/types";
import { getConstants } from "~/config";

type ContextType = {
  // Theme
  lightTheme?: boolean;

  // Address control
  userAddress: string;
  setUserAddress: (val: string) => void;

  // Safe control
  safeAddress: string;
  setSafeAddress: (val: string) => void;

  // Origin Chain Id control
  originChainId: number;
  setOriginChainId: (val: number) => void;

  // Origin Chain Key control
  originChainKey: string;
  setOriginChainKey: (val: string) => void;

  // Destiny Chain control
  destinyChain: string;
  setDestinyChain: (val: string) => void;

  // Available chains
  originChainList: ChainData;
  destinyChainList: ChainData;

  // Safe onwners
  owners: string[];
  setOwners: (address: string[]) => void;

  // Safe threshold
  threshold: number;
  setThreshold: (val: number) => void;

  // Destiny Transaction data
  destinationTxData: TxData | undefined;
  setDestinationTxData: (value: TxData | undefined) => void;

  // Create Safe sentinel
  createSafe: boolean;
  setCreateSafe: (val: boolean) => void;

  // ConnextModule
  connextModule: string;
  setConnextModule: (val: string) => void;

  // Origin Transaction data
  setTx: (tx: string) => void;

  // Provider
  provider?: providers.JsonRpcProvider;

  // Signer
  signer?: providers.JsonRpcSigner;

  // Modal
  modal?: boolean;

  // Destination Provider
  destinyProvider: providers.JsonRpcProvider;

  // Testnet
  testnet?: boolean;
};

interface ModalProps {
  provider?: providers.JsonRpcProvider;
  signer?: providers.JsonRpcSigner;
  children: React.ReactElement;
  setTx: (tx: string) => void;
  originAddress: string;
  lightTheme?: boolean;
  userChainId: number;
  alchemyKey?: string;
  infuraKey?: string;
  modal?: boolean;
  testnet?: boolean;
}

const DataContext = createContext({} as ContextType);

export const DataProvider = ({
  provider,
  signer,
  children,
  setTx,
  originAddress,
  lightTheme,
  userChainId,
  alchemyKey,
  infuraKey,
  modal,
  testnet,
}: ModalProps) => {
  const {
    Chains,
    AVAILABLE_DESTINY_NETWORKS,
    AVAILABLE_ORIGIN_NETWORKS,
    TESTNET_AVAILABLE_DESTINY_NETWORKS,
    TESTNET_AVAILABLE_ORIGIN_NETWORKS,
  } = getConstants();

  const [originChainList, setOriginChainList] = useState<ChainData>(
    getAvailableChains(
      Chains,
      TESTNET_AVAILABLE_ORIGIN_NETWORKS,
      AVAILABLE_ORIGIN_NETWORKS,
      testnet
    )
  );
  const [destinyChainList, setDestinyChainList] = useState<ChainData>(
    getAvailableChains(
      Chains,
      TESTNET_AVAILABLE_DESTINY_NETWORKS,
      AVAILABLE_DESTINY_NETWORKS,
      testnet
    )
  );

  const [originChainKey, setOriginChainKey] = useState<string>(
    Object.keys(originChainList)[0]
  );
  const [destinyChain, setDestinyChain] = useState<string>(
    Object.keys(destinyChainList)[0]
  );

  const [userAddress, setUserAddress] = useState<string>("");
  const [safeAddress, setSafeAddress] = useState<string>("");
  const [originChainId, setOriginChainId] = useState<number>(1);
  const [createSafe, setCreateSafe] = useState<boolean>(false);
  const [connextModule, setConnextModule] = useState<string>("");
  const [owners, setOwners] = useState<string[]>([]);
  const [threshold, setThreshold] = useState(1);

  const [destinationTxData, setDestinationTxData] = useState<
    TxData | undefined
  >();

  const [destinyProvider, setDestinyProvider] =
    useState<providers.JsonRpcProvider>(
      getDestinationProvider(destinyChain, alchemyKey, infuraKey)
    );

  // Set the user address and origin chain id when the origin address changes
  useEffect(() => {
    setUserAddress(originAddress);
    setOriginChainId(userChainId);
  }, [originAddress, userChainId]);

  // Set the origin chain list when the testnet changes
  useEffect(() => {
    setOriginChainList(
      getAvailableChains(
        Chains,
        TESTNET_AVAILABLE_ORIGIN_NETWORKS,
        AVAILABLE_ORIGIN_NETWORKS,
        testnet
      )
    );
  }, [testnet]);

  // Set the destiny chain list when the testnet changes
  useEffect(() => {
    setDestinyChainList(
      getAvailableChains(
        Chains,
        TESTNET_AVAILABLE_DESTINY_NETWORKS,
        AVAILABLE_DESTINY_NETWORKS,
        testnet
      )
    );
  }, [testnet]);

  // Set the origin chain key when the origin chain id changes
  useEffect(() => {
    setOriginChainKey(getChainKey(originChainId, originChainList));
  }, [originChainId, originChainList]);

  // Set the destiny chain when the origin chain key changes
  useEffect(() => {
    setDestinyChain(Object.keys(destinyChainList)[0]);
  }, [destinyChainList, testnet, originChainKey]);

  // Set the provider for the destination chain when the chain changes
  useEffect(() => {
    setDestinyProvider(
      getDestinationProvider(destinyChain, alchemyKey, infuraKey)
    );
  }, [destinyChain, alchemyKey, infuraKey]);

  return (
    <DataContext.Provider
      value={{
        userAddress,
        setUserAddress,
        safeAddress,
        setSafeAddress,
        originChainId,
        setOriginChainId,
        destinyChain,
        originChainList,
        destinyChainList,
        setDestinyChain,
        owners,
        setOwners,
        threshold,
        setThreshold,
        destinationTxData,
        setDestinationTxData,
        setTx,
        createSafe,
        setCreateSafe,
        provider,
        signer,
        lightTheme,
        modal,
        destinyProvider,
        connextModule,
        setConnextModule,
        originChainKey,
        setOriginChainKey,
        testnet,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataProvider");
  }

  return context;
};
