import { useEffect, useState } from "react";

import { BaseModal, Button, Text, SInput } from "~/components";
import { ModalProps, StepType } from "~/types";
import { useNavigationContext } from "~/Context";
import { isAddress } from "~/utils";

export const SafeSettingsStep = ({ onClose, ...props }: ModalProps) => {
  const { setType } = useNavigationContext();
  const [inputAddress, setInputAddress] = useState<string>("");
  const [safeName, setSafeName] = useState<string>("");
  const [isValid, setValid] = useState(false);
  const [addresses, setAddresses] = useState<string[]>([]);

  useEffect(() => {
    if (inputAddress) {
      const isRepited = addresses.find((address) => address === inputAddress);
      console.log(isAddress(inputAddress), !isRepited);
      setValid(isAddress(inputAddress) && !isRepited);
    } else {
      setValid(true);
    }
  }, [inputAddress, isValid, addresses]);

  const removeItem = (item: string) => {
    const index = addresses.indexOf(item);
    const newAddresses = [...addresses];
    newAddresses.splice(index, 1);
    setAddresses(newAddresses);
  };

  const addAddress = () => {
    setAddresses([inputAddress, ...addresses]);
    setInputAddress("");
  };

  return (
    <BaseModal {...props} onClose={onClose} header="Cross-chain Action">
      <h2>Safe Settings</h2>

      <Text>Safe Name:</Text>
      <SInput
        placeholder="Input Safe Name"
        value={safeName}
        onChange={(e) => setSafeName(e.target.value)}
      />

      <Text>Safe Owners:</Text>
      <SInput
        placeholder="Input Owner Address"
        value={inputAddress}
        onChange={(e) => setInputAddress(e.target.value)}
      />
      {!isValid && (
        <span style={{ color: "red" }}>Invalid Ethereum Address</span>
      )}
      {inputAddress && isValid && (
        <Button onClick={() => addAddress()}>➕</Button>
      )}
      <div>
        {addresses.map((address) => (
          <div
            key={address}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>{address}</Text>
            <Button onClick={() => removeItem(address)}>✖</Button>
          </div>
        ))}
      </div>

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
