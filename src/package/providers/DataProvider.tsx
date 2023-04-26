import { createContext, useState, useContext, useEffect } from "react";

type ContextType = {
  // Address control
  address: string | null;
  setAddress: (val: string) => void;

  // Chain control
  chainId: number | null;
  setChainId: (val: number) => void;
};

interface ModalProps {
  originAddress: string;
  originChainId: number;
  children: React.ReactElement;
}

const DataContext = createContext({} as ContextType);

export const DataProvider = ({
  children,
  originAddress,
  originChainId,
}: ModalProps) => {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  useEffect(() => {
    setAddress(originAddress);
    setChainId(originChainId);
  }, [originAddress, originChainId]);

  return (
    <DataContext.Provider
      value={{
        address,
        setAddress,
        chainId,
        setChainId,
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
