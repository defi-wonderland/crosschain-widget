import { useEffect, useState } from "react";
import { providers } from "ethers";

import { LoadingContainer } from "./ModuleStep.styles";
import { getModuleFromSafe, isAddress } from "~/utils";
import { Spinner, Text } from "~/components";
import { StepType } from "~/types";

interface LoadingStepProps {
  setType: (val: StepType | null) => void;
  safeAddress: string;
  destinyProvider: providers.Provider;
  setLoadingScreen: (val: boolean) => void;
  setConnextModule: (val: string) => void;
  userAddress: string;
  domainId: number;
  connext: string;
}

export const LoadingStep = ({
  setType,
  safeAddress,
  destinyProvider,
  setLoadingScreen,
  setConnextModule,
  userAddress,
  domainId,
  connext,
}: LoadingStepProps) => {
  const [hasResult, setHasResult] = useState(false);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(5);

  const handleGetModule = async () => {
    const moduleAddress = await getModuleFromSafe(
      safeAddress,
      destinyProvider,
      userAddress,
      domainId,
      connext
    );

    if (isAddress(moduleAddress)) {
      setConnextModule(moduleAddress);
    } else {
      setError(true);
    }

    setHasResult(true);
    handleRedirect(isAddress(moduleAddress));
  };

  const handleRedirect = (hasModule: boolean) => {
    setTimeout(() => {
      if (hasModule) {
        setType(StepType.TRANSACTION);
      } else {
        setLoadingScreen(false);
      }
    }, 5000);
  };

  useEffect(() => {
    handleGetModule();
  }, []);

  useEffect(() => {
    if (count > 0 && hasResult) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, hasResult]);

  return (
    <LoadingContainer>
      <Spinner />
      {hasResult && (
        <>
          {!error && <h1>Verification successful!</h1>}
          {error && <h1>Module not found!</h1>}

          <Text>Redirecting you in {count}...</Text>
        </>
      )}
    </LoadingContainer>
  );
};
