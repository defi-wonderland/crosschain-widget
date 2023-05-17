import { useEffect, useState } from "react";

import { LoadingContainer } from "./ModuleStep.styles";
import { Spinner, Text } from "~/components";
import { StepType } from "~/types";

interface LoadingStepProps {
  setType: (val: StepType | null) => void;
}

export const LoadingStep = ({ setType }: LoadingStepProps) => {
  const [hasModule, setHasModule] = useState(false);
  const [count, setCount] = useState(3);

  const handleGetModule = async () => {
    // logic to check if module is enabled here...

    // temporaty timeout to simulate loading
    setTimeout(() => {
      setHasModule(true);
    }, 3000);

    // if it isnt enabled, redirect to module setup
    // setType(StepType.MODULE_SETUP);
  };

  const handleRedirect = () => {
    setTimeout(() => {
      setType(StepType.TRANSACTION);
    }, 3000);
  };

  useEffect(() => {
    if (!hasModule) {
      handleGetModule();
    } else {
      handleRedirect();
    }
  }, [hasModule]);

  useEffect(() => {
    if (count > 0 && hasModule) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, hasModule]);

  return (
    <LoadingContainer>
      <Spinner />
      {!hasModule && <h1>Verifying your setup...</h1>}
      {hasModule && (
        <>
          <h1>Verification Successful!</h1>
          <Text>Redirecting you in {count}...</Text>
        </>
      )}
    </LoadingContainer>
  );
};
