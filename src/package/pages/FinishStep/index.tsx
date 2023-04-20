import { useState } from "react";

import { BaseModal, Button, Text } from "~/components";
import { ModalProps, StepType } from "~/types";
import { useNavigationContext } from "~/Context";
import { copyData } from "~/utils";

export const FinishStep = ({ onClose, ...props }: ModalProps) => {
  const { setType } = useNavigationContext();
  const [data, setData] = useState("arbitrary data...");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    setCopied(true);
    copyData(data);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <BaseModal {...props} onClose={onClose} header="xCallData Review Step">
      <h2>Croos-chain Action</h2>

      <h2>Success!</h2>

      <Text>Data...</Text>
      <Button onClick={() => handleCopy()}>Copy Data</Button>
      {copied && <Text>Copied to clipboard!</Text>}

      <Text>Origin Chain: Ethereum</Text>
      <Text>Origin sender: 0x0000000000000000000000</Text>
      <Text>Destination Chain: Optimism</Text>
      <Text>Destination Safe: 0x111111111111111111111111111</Text>

      <Text>Transactions batch...</Text>

      <Button
        onClick={async () => {
          setType(StepType.None);
        }}
      >
        Confirm
      </Button>
    </BaseModal>
  );
};
