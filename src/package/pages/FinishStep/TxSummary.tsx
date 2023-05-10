import { useState } from "react";

import { STextArea, Toggle } from "~/components";
import {
  ArrowDown,
  ArrowUp,
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
import { copyData } from "~/utils";

interface TxSummaryProps {
  title: string;
  data: string;
  origin: string;
  destiny: string;
  value: string;
  textTitle: string;
}

export const TxSummary = ({
  title,
  data,
  origin,
  destiny,
  value,
  textTitle,
}: TxSummaryProps) => {
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
        {showDetails && <ArrowUp />}
        {!showDetails && <ArrowDown />}
      </TitleContainer>

      <DetailsSection
        className={`details-section ${showDetails ? "show" : ""}`}
      >
        {componentData.map(({ key, value }) => (
          <>
            <TextContainer>
              <DetailText opacity>{key}</DetailText>
              <DetailValue onClick={() => handleCopy(value)}>
                <DetailText>{value}</DetailText>
                {copied && <CheckIcon />}
                {!copied && <CopyIcon />}
              </DetailValue>
            </TextContainer>
          </>
        ))}

        <ToggleSection>
          <Toggle onClick={() => setShowDecoded(!showDecoded)} />
          <DetailText>Decode</DetailText>
        </ToggleSection>

        {/* Temporary: we need add decoded format  */}
        <STextArea title={textTitle} wrap="on" value={data} disabled />
      </DetailsSection>
    </Container>
  );
};
