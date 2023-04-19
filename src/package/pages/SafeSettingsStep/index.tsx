import { BaseModal, Button, Text } from "~/components";
import { ModalProps, StepType } from "~/types";
import { useModalContext } from "~/Context";
import { useEffect, useState } from "react";
import { isAddress } from "~/utils";

export const SafeSettingsStep = ({ onClose, ...props }: ModalProps) => {
  const { setType } = useModalContext();
  const [inputAddress, setInputAddress] = useState<string>("");
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if (inputAddress) {
      setIsInvalid(!isAddress(inputAddress));
    } else {
      setIsInvalid(false);
    }
  }, [inputAddress]);

  return (
    <BaseModal {...props} onClose={onClose} header="Cross-chain Action">
      <h2>Safe Settings</h2>
      <br />
      <Text>Safe Name:</Text>
      <input placeholder="Input Name" />
      <br />
      <Text>Safe Owners:</Text>
      <input
        placeholder="Input Owner Address"
        value={inputAddress}
        onChange={(e) => setInputAddress(e.target.value)}
      />
      {isInvalid && (
        <span style={{ color: "red" }}>Invalid Ethereum Address</span>
      )}
      <Button>➕</Button>
      <Text>0x1234...abdc</Text>
      <Button>✖</Button>
      <br />
      <br />
      <Button
        onClick={async () => {
          setType(StepType.START);
        }}
      >
        Go back
      </Button>
      <Button
        onClick={async () => {
          setType(StepType.TRANSACTION);
        }}
      >
        Next
      </Button>
    </BaseModal>
  );
};
