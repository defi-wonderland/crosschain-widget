import { useState } from "react";

import { ExternalLink, IntructionsContainer } from "./ModuleStep.styles";
import { useDataContext, useNavigationContext } from "~/providers";
import { BaseModal, Button, Text } from "~/components";
import { ModalProps, StepType } from "~/types";
import { LoadingStep } from "./LoadingStep";
import { getConstants } from "~/config";

export const ModuleStep = ({ ...props }: ModalProps) => {
  const { setType } = useNavigationContext();
  const { Chains } = getConstants();
  const { safeAddress, destinyChain } = useDataContext();
  const [loadinScreen, setLoadingScreen] = useState(false);

  return (
    <BaseModal
      {...props}
      onBack={() => setType(StepType.START)}
      header={!loadinScreen ? "Safe module setup" : ""}
    >
      {loadinScreen && <LoadingStep setType={setType} />}

      {!loadinScreen && (
        <>
          <Text>
            Before continuing, you will need to deploy and enable the Connext
            Module in your Safe.
          </Text>
          <IntructionsContainer>
            <Text>
              1. Go to:{" "}
              <ExternalLink
                href={`https://app.safe.global/apps/open?safe=${Chains[destinyChain].safeIdentifier}:${safeAddress}&appUrl=https%3A%2F%2Fzodiac.gnosisguild.org%2F`}
              >
                Zodiac Application
              </ExternalLink>
            </Text>

            <Text>
              2. Select &quot;Connext Module&quot; and follow the instructions
            </Text>
            <Text>3. In origin chain add: 0x00000000000000000</Text>
            <Text>4. In origin address add: 0x00000000000000000</Text>
          </IntructionsContainer>
          <Button onClick={() => setLoadingScreen(true)}>Verify setup</Button>
        </>
      )}
    </BaseModal>
  );
};
