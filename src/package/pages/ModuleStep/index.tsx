import { useState } from "react";

import {
  InfoMsg,
  ExternalLink,
  IntructionsContainer,
  ExternalLinkContainer,
  IntructionsText,
  TextToCopy,
  SText,
} from "./ModuleStep.styles";
import { CheckIcon, CopyIcon } from "~/pages/FinishStep/TxSummary.styles";
import { useDataContext, useNavigationContext } from "~/providers";
import { copyData, truncatedAddress } from "~/utils";
import { BaseModal, Button } from "~/components";
import { ModalProps, StepType } from "~/types";
import { LoadingStep } from "./LoadingStep";
import { getConstants } from "~/config";

export const ModuleStep = ({ ...props }: ModalProps) => {
  const { setType } = useNavigationContext();
  const { Chains } = getConstants();
  const {
    safeAddress,
    destinyChain,
    originChainKey,
    userAddress,
    lightTheme,
    destinyProvider,
    setConnextModule,
  } = useDataContext();

  const [loadinScreen, setLoadingScreen] = useState(false);
  const [copiedElements, setCopiedElements] = useState([
    { copied: false },
    { copied: false },
  ]);
  const originDomainId = Chains[originChainKey]?.domainId.toString();

  const handleCopy = async (content: string, item: number) => {
    copyData(content);

    const newCopiedElements = [...copiedElements];
    newCopiedElements[item].copied = true;
    setCopiedElements(newCopiedElements);

    setTimeout(() => {
      const newCopiedElements = [...copiedElements];
      newCopiedElements[item].copied = false;
      setCopiedElements(newCopiedElements);
    }, 600);
  };

  return (
    <BaseModal
      {...props}
      onBack={() => setType(StepType.START)}
      header={!loadinScreen ? "Safe module setup" : ""}
    >
      {loadinScreen && (
        <LoadingStep
          setType={setType}
          safeAddress={safeAddress}
          destinyProvider={destinyProvider}
          setLoadingScreen={setLoadingScreen}
          setConnextModule={setConnextModule}
          domainId={Chains[originChainKey]?.domainId}
          connext={Chains[destinyChain]?.connextContract}
          userAddress={userAddress}
        />
      )}

      {!loadinScreen && (
        <>
          <SText>
            Before continuing, you will need to deploy and enable the Connext
            Module in your Safe.
          </SText>
          <IntructionsContainer>
            <ExternalLinkContainer>
              <SText>
                1. Go to:{" "}
                <ExternalLink
                  href={`https://app.safe.global/apps/open?safe=${Chains[destinyChain]?.safeIdentifier}:${safeAddress}&appUrl=https%3A%2F%2Fzodiac.gnosisguild.org%2F`}
                >
                  Zodiac Application
                </ExternalLink>
              </SText>
              <InfoMsg>
                <p>This link redirects to an external site</p>
              </InfoMsg>
            </ExternalLinkContainer>

            <SText>
              2. Select &quot;Connext Module&quot; and follow the instructions
            </SText>

            <IntructionsText>
              <SText>3. In origin address, paste:</SText>
              <TextToCopy onClick={() => handleCopy(userAddress, 0)}>
                {truncatedAddress(userAddress)}
              </TextToCopy>
              {copiedElements[0].copied && (
                <CheckIcon lightTheme={lightTheme} />
              )}
              {!copiedElements[0].copied && (
                <CopyIcon lightTheme={lightTheme} />
              )}
            </IntructionsText>

            <IntructionsText>
              <SText>4. In origin chain, paste:</SText>
              <TextToCopy onClick={() => handleCopy(originDomainId, 1)}>
                {originDomainId}
              </TextToCopy>
              {copiedElements[1].copied && (
                <CheckIcon lightTheme={lightTheme} />
              )}
              {!copiedElements[1].copied && (
                <CopyIcon lightTheme={lightTheme} />
              )}
            </IntructionsText>
          </IntructionsContainer>

          <Button onClick={() => setLoadingScreen(true)}>Verify setup</Button>
        </>
      )}
    </BaseModal>
  );
};
