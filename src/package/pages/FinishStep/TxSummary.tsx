import { useState } from "react";

import { STextArea, Toggle, ArrowDown, ArrowUp } from "~/components";
import {
  CheckIcon,
  Container,
  CopyIcon,
  DetailText,
  DetailValue,
  DetailsSection,
  TextContainer,
  TitleContainer,
  ToggleSection,
} from "./TxSummary.styles";
import { copyData, getRedeableData } from "~/utils";
import { useDataContext } from "~/providers";
import { TxData } from "~/types";

interface TxSummaryProps {
  title: string;
  txData: TxData;
  origin: string;
  destiny: string;
  value: string;
  textTitle: string;
}

export const TxSummary = ({
  title,
  txData,
  origin,
  destiny,
  value,
  textTitle,
}: TxSummaryProps) => {
  const { lightTheme } = useDataContext();
  const [showDecoded, setShowDecoded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const componentData = [
    { key: "From", value: origin },
    { key: "To", value: destiny },
    { key: "Value", value: value },
  ];

  const handleCopy = async (content: string) => {
    setCopied(true);
    copyData(content);

    setTimeout(() => {
      setCopied(false);
    }, 600);
  };

  return (
    <Container>
      <TitleContainer onClick={() => setShowDetails(!showDetails)}>
        <h1>{title}</h1>
        {showDetails && <ArrowUp lightTheme={lightTheme} />}
        {!showDetails && <ArrowDown lightTheme={lightTheme} />}
      </TitleContainer>

      <DetailsSection
        className={`details-section ${showDetails ? "show" : ""}`}
      >
        {componentData.map(({ key, value }) => (
          <TextContainer key={key}>
            <DetailText isOpaque>{key}</DetailText>
            <DetailValue onClick={() => handleCopy(value)}>
              <DetailText>{value}</DetailText>
              {copied && <CheckIcon lightTheme={lightTheme} />}
              {!copied && <CopyIcon lightTheme={lightTheme} />}
            </DetailValue>
          </TextContainer>
        ))}

        <ToggleSection>
          <Toggle onClick={() => setShowDecoded(!showDecoded)} />
          <DetailText>Decode</DetailText>
        </ToggleSection>

        {/* Temporary: we need add decoded format  */}
        <STextArea
          title={textTitle}
          wrap="on"
          value={showDecoded ? getRedeableData(txData) : txData.data}
          disabled
        />
      </DetailsSection>
    </Container>
  );
};
