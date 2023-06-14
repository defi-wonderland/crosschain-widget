import { createContext, useState, useContext, useEffect } from "react";
import { providers } from "ethers";

import { getChainKey, getDestinationProvider } from "~/utils";
import { TxData } from "~/types";

type ContextType = {
  // Theme
  lightTheme?: boolean;

  // Address control
  userAddress: string;
  setUserAddress: (val: string) => void;

  // Safe control
  safeAddress: string;
  setSafeAddress: (val: string) => void;

  // Origin Chain control
  originChainId: number;
  setOriginChainId: (val: number) => void;

  // Destiny Chain control
  destinyChain: string;
  setDestinyChain: (val: string) => void;

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
}: ModalProps) => {
  const [userAddress, setUserAddress] = useState<string>("");
  const [safeAddress, setSafeAddress] = useState<string>("");
  const [originChainId, setOriginChainId] = useState<number>(1);
  const [destinyChain, setDestinyChain] = useState<string>("ethereum");
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

  useEffect(() => {
    setUserAddress(originAddress);
    setOriginChainId(userChainId);
  }, [originAddress, userChainId]);

  /* 
    If the originChain is ethereum, we want to set the destinyChain to
    the next chain in the list
  */
  useEffect(() => {
    if (getChainKey(userChainId) === "ethereum") {
      setDestinyChain("polygon");
    }
  }, []);

  useEffect(() => {
    setDestinyProvider(
      getDestinationProvider(destinyChain, alchemyKey, infuraKey)
    );
  }, [destinyChain]);

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
