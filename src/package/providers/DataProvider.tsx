import { createContext, useState, useContext, useEffect } from "react";
import { providers } from "ethers";

import { TxData } from "~/types";

type ContextType = {
  // Address control
  userAddress: string;
  setUserAddress: (val: string) => void;

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
  threshold: string | undefined;
  setThreshold: (val: string) => void;

  // Destiny Transaction data
  txData: TxData | undefined;
  setTxData: (value: TxData) => void;

  // Origin Transaction data
  setTx: (tx: string) => void;

  // Provider
  provider?: providers.JsonRpcProvider;
};

interface ModalProps {
  originAddress: string;
  userChainId: number;
  children: React.ReactElement;
  setTx: (tx: string) => void;
  provider?: providers.JsonRpcProvider;
}

const DataContext = createContext({} as ContextType);

export const DataProvider = ({
  children,
  originAddress,
  userChainId,
  setTx,
  provider,
}: ModalProps) => {
  const [userAddress, setUserAddress] = useState<string>("");
  const [originChainId, setOriginChainId] = useState<number>(1);
  const [destinyChain, setDestinyChain] = useState<string>("mainnet");

  const [owners, setOwners] = useState<string[]>([]);
  const [threshold, setThreshold] = useState<string | undefined>();
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
        provider,
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
