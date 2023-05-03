import { useState } from "react";
import { providers } from "ethers";

import { BaseModal, Button, SInput, STextArea, Text } from "~/components";
import { ModalProps, StepType } from "~/types";
import { useDataContext, useNavigationContext } from "~/providers";
import { copyData, estimateRelayerFee } from "~/utils";

export const FinishStep = ({ onClose, ...props }: ModalProps) => {
  const { setType } = useNavigationContext();
  const { owners, threshold, txData } = useDataContext();
  const [data, setData] = useState("arbitrary data...");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    setCopied(true);
    copyData(data);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

    const relayerFee = await getRelayerFee();
    // temporary
    console.log(owners, threshold, txData, relayerFee);
  };

  // temporary
  const getRelayerFee = async () => {
    const provider = new providers.JsonRpcProvider("https://eth.llamarpc.com");
    const relayerFee = await estimateRelayerFee(provider, "mainnet");
    return relayerFee;
  };

  return (
    <BaseModal {...props} onClose={onClose} header="xCallData Confirmation">
      <br />
      <Text>Origin chain: Ethereum</Text>
      <Text>Origin sender: 0x000000000000000000000000000001</Text>
      <Text>Destination chain: Optimism</Text>
      <Text>Destination sender: 0x000000000000000000000000000001</Text>
      <br />
      <h1>Transaction Information</h1>
      <Text>to:</Text>
      <SInput
        placeholder="param 1"
        value={"0x0000000000000000000000000000"}
        disabled
      />
      <Text>value:</Text>
      <SInput placeholder="param 2" value={"1.00"} disabled />
      <Text>xCallData parameters:</Text>
      <STextArea wrap="on" value={JSON.stringify(txData)} disabled />
      <Button onClick={() => handleCopy()}>Copy Data</Button>
      {copied && <Text>Copied to clipboard!</Text>}
      <Button
        onClick={async () => {
          setType(StepType.None);
        }}
      >
        Confirm
      </Button>
      <Button
        onClick={async () => {
          setType(StepType.TRANSACTION);
        }}
      >
        Back
      </Button>
    </BaseModal>
  );
};
