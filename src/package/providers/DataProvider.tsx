import { createContext, useState, useContext, useEffect } from "react";
import { providers } from "ethers";

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
  txData: TxData | undefined;
  setTxData: (value: TxData) => void;

  // Create Safe sentinel
  createSafe: boolean;
  setCreateSafe: (val: boolean) => void;

  // Origin Transaction data
  setTx: (tx: string) => void;

  // Provider
  provider?: providers.JsonRpcProvider;

  // Modal
  modal?: boolean;
};

interface ModalProps {
  originAddress: string;
  userChainId: number;
  children: React.ReactElement;
  setTx: (tx: string) => void;
  provider?: providers.JsonRpcProvider;
  lightTheme?: boolean;
  modal?: boolean;
}

const DataContext = createContext({} as ContextType);

export const DataProvider = ({
  children,
  originAddress,
  userChainId,
  setTx,
  provider,
  lightTheme,
  modal,
}: ModalProps) => {
  const [userAddress, setUserAddress] = useState<string>("");
  const [safeAddress, setSafeAddress] = useState<string>("");
  const [originChainId, setOriginChainId] = useState<number>(1);
  const [destinyChain, setDestinyChain] = useState<string>("ethereum");
  const [createSafe, setCreateSafe] = useState<boolean>(false);

  const [owners, setOwners] = useState<string[]>([]);
  const [threshold, setThreshold] = useState(1);
  const [txData, setTxData] = useState<TxData | undefined>();

  useEffect(() => {
    setUserAddress(originAddress);
    setOriginChainId(userChainId);
  }, [originAddress, userChainId]);

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
        txData,
        setTxData,
        setTx,
        createSafe,
        setCreateSafe,
        provider,
        lightTheme,
        modal,
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
