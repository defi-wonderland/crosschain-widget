import { createContext, useState, useContext } from "react";

import { StepType } from "~/types";

type ContextType = {
  // Navigation control
  type: StepType | null;
  setType: (val: StepType | null) => void;
};

interface NavigationProps {
  children: React.ReactElement;
}

const NavigationContext = createContext({} as ContextType);

export const NavigationProvider = ({ children }: NavigationProps) => {
  const [type, setType] = useState<StepType | null>(null);

  return (
    <NavigationContext.Provider
      value={{
        type,
        setType,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error(
      "useNavigationContext must be used within a NavigationProvider"
    );
  }

  return context;
};
