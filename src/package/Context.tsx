import { createContext, useState, useContext, useEffect } from "react";

import { StepType } from "./types";

export type ModalContextType = {
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

export const ModalContentContext = createContext({} as ModalContextType);

export const ModalContentProvider = ({
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
    <ModalContentContext.Provider
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
    </ModalContentContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContentContext);

  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
};
