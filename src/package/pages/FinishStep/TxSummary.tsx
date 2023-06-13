import { useEffect, useState } from "react";

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
  txValue: string;
  textTitle: string;
  showDetails: boolean;
  setShowDetails: (value: boolean) => void;
}

interface items {
  key: string;
  value: string;
  itemCopied: boolean;
}

export const TxSummary = ({
  title,
  txData,
  origin,
  destiny,
  txValue,
  textTitle,
  showDetails,
  setShowDetails,
}: TxSummaryProps) => {
  const { lightTheme } = useDataContext();
  const [showDecoded, setShowDecoded] = useState(true);
  const [items, setItems] = useState<items[]>([
    { key: "From", value: origin, itemCopied: false },
    { key: "To", value: destiny, itemCopied: false },
    { key: "Value", value: txValue, itemCopied: false },
  ]);

  const handleCopy = async (content: string, index: number) => {
    copyData(content);

    const newItems = [...items];
    newItems[index].itemCopied = true;
    setItems(newItems);

    setTimeout(() => {
      const newItems = [...items];
      newItems[index].itemCopied = false;
      setItems(newItems);
    }, 600);
  };

  useEffect(() => {
    const newItems = [...items];
    newItems[2].value = txValue;
    setItems(newItems);
  }, [txData, txValue]);

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
        {items.map(({ key, value, itemCopied }, index) => (
          <TextContainer key={key}>
            <DetailText isOpaque>{key}</DetailText>
            <DetailValue onClick={() => handleCopy(value, index)}>
              <DetailText>{value}</DetailText>
              {itemCopied && <CheckIcon lightTheme={lightTheme} />}
              {!itemCopied && <CopyIcon lightTheme={lightTheme} />}
            </DetailValue>
          </TextContainer>
        ))}

        <ToggleSection>
          <Toggle
            checked={showDecoded}
            onClick={() => setShowDecoded(!showDecoded)}
          />
          <DetailText>Decode</DetailText>
        </ToggleSection>

        <STextArea
          title={textTitle}
          wrap="on"
          value={showDecoded ? getRedeableData(txData) : txData?.data}
          disabled
        />
      </DetailsSection>
    </Container>
  );
};
