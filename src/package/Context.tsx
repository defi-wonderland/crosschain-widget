import { createContext, useState, useContext, useEffect } from "react";

import { StepType } from "./types";

export type ContextType = {
  // Control Modal
  type: StepType | null;
  setType: (val: StepType | null) => void;

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

export const NavigationContext = createContext({} as ContextType);

export const NavigationProvider = ({
  children,
  originAddress,
  originChainId,
}: ModalProps) => {
  const [type, setType] = useState<StepType | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  useEffect(() => {
    setAddress(originAddress);
    setChainId(originChainId);
  }, [originAddress, originChainId]);

  return (
    <NavigationContext.Provider
      value={{
        type,
        setType,
        address,
        setAddress,
        chainId,
        setChainId,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error("useNavigationContext must be used within a ModalProvider");
  }

  return context;
};
