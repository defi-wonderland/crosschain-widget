import { useState } from "react";

import {
  ExternalLink,
  IntructionsContainer,
  IntructionsText,
  TextToCopy,
} from "./ModuleStep.styles";
import { CheckIcon, CopyIcon } from "~/pages/FinishStep/TxSummary.styles";
import { useDataContext, useNavigationContext } from "~/providers";
import { copyData, getChainKey, truncatedAddress } from "~/utils";
import { BaseModal, Button, Text } from "~/components";
import { ModalProps, StepType } from "~/types";
import { LoadingStep } from "./LoadingStep";
import { getConstants } from "~/config";

export const ModuleStep = ({ ...props }: ModalProps) => {
  const { setType } = useNavigationContext();
  const { Chains } = getConstants();
  const { safeAddress, destinyChain, originChainId, userAddress, lightTheme } =
    useDataContext();

  const [loadinScreen, setLoadingScreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const chainKey = getChainKey(originChainId!);
  const originDomainId = Chains[chainKey].domainId.toString();

  const handleCopy = async (content: string) => {
    setCopied(true);
    copyData(content);

    setTimeout(() => {
      setCopied(false);
    }, 600);
  };

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
                href={`https://app.safe.global/apps/open?safe=${Chains[destinyChain]?.safeIdentifier}:${safeAddress}&appUrl=https%3A%2F%2Fzodiac.gnosisguild.org%2F`}
              >
                Zodiac Application
              </ExternalLink>
            </Text>

            <Text>
              2. Select &quot;Connext Module&quot; and follow the instructions
            </Text>
            <IntructionsText>
              <Text>3. In origin address, add:</Text>
              <TextToCopy onClick={() => handleCopy(userAddress)}>
                {truncatedAddress(userAddress)}
              </TextToCopy>
              {copied && <CheckIcon lightTheme={lightTheme} />}
              {!copied && <CopyIcon lightTheme={lightTheme} />}
            </IntructionsText>
            <IntructionsText>
              <Text>4. In origin chain, add:</Text>
              <TextToCopy onClick={() => handleCopy(originDomainId)}>
                {originDomainId}
              </TextToCopy>
              {copied && <CheckIcon lightTheme={lightTheme} />}
              {!copied && <CopyIcon lightTheme={lightTheme} />}
            </IntructionsText>
          </IntructionsContainer>
          <Button onClick={() => setLoadingScreen(true)}>Verify setup</Button>
        </>
      )}
    </BaseModal>
  );
};
