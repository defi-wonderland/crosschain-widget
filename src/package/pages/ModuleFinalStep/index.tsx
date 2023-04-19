import { useState } from "react";

import { BaseModal, Button, Text } from "~/components";
import { ModalProps, StepType } from "~/types";
import { useNavigationContext } from "~/Context";
import { copyData } from "~/utils";

export const ModuleFinalStep = ({ onClose, ...props }: ModalProps) => {
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
    <BaseModal
      {...props}
      onClose={onClose}
      header="Off-Chain Module Landing Page"
    >
      <h2>Safe Module Deploy</h2>
      <br />
      <Button>Connect to Metamask</Button>
      <br />
      <h2>Review Module Settings:</h2>
      <br />
      <Text>Origin Chain: Ethereum</Text>
      <Text>Origin Sender: 0x000000000000000000000</Text>
      <Text>Destination Chain: Optimism</Text>
      <Text>Destination Safe: 0x0000000000000000000000</Text>
      <br />
      <br />
      <Button>Confirm and Deploy module</Button>
      <span>Wrong network/Bad query params</span>
      <br />
      <Text>Module Address: 0xYourNewModuleAddress</Text>
      <Button onClick={() => handleCopy()}>Copy Address</Button>
      {copied && <Text>Copied to clipboard!</Text>}

      <Button>Open new tab: safe.global/0xsafe and add this module</Button>
      <br />
      <br />

      <Button
        onClick={async () => {
          setType(StepType.None);
        }}
      >
        Check setup
      </Button>
      <span>Sucess! You can go back to the wisget now</span>
    </BaseModal>
  );
};
