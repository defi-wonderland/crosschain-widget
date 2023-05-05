import { useEffect, useState } from "react";

import { BaseModal, Button, Text, SInput, Dropdown } from "~/components";
import { useDataContext, useNavigationContext } from "~/providers";
import { ModalProps, StepType } from "~/types";
import { isAddress } from "~/utils";

export const SafeSettingsStep = ({ onClose, ...props }: ModalProps) => {
  const { setOwners, setThreshold, owners } = useDataContext();
  const { setType } = useNavigationContext();

  const [inputAddress, setInputAddress] = useState<string>("");
  const [isValid, setValid] = useState(true);

  const removeItem = (item: string) => {
    const index = owners.indexOf(item);
    const newAddresses = [...owners];
    newAddresses.splice(index, 1);
    setOwners(newAddresses);
  };

  const addOwner = () => {
    setOwners([...owners, inputAddress]);
    setInputAddress("");
  };

  useEffect(() => {
    if (inputAddress) {
      const isRepited = owners.find((address) => address === inputAddress);
      setValid(isAddress(inputAddress) && !isRepited);
    } else {
      setValid(true);
    }
  }, [inputAddress, isValid, owners]);

  return (
    <BaseModal {...props} onClose={onClose} header="Safe Configuration">
      {/* Owners Section */}
      {owners.map((address) => (
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
      <SInput
        title="Owner address"
        placeholder="Input Owner Address"
        value={inputAddress}
        onChange={(e) => setInputAddress(e.target.value)}
      />
      {!isValid && (
        <span style={{ color: "red" }}>Invalid Ethereum Address</span>
      )}

      <Button onClick={() => addOwner()} disabled={!isValid || !inputAddress}>
        + Add owner
      </Button>

      {/* Threshold section */}
      <h1>Threshold</h1>

      <Text>Any transaction requires the confirmation of:</Text>
      <Dropdown title="#" onChange={(e) => setThreshold(e.target.value)}>
        {owners.map((value, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </Dropdown>
      <Text>out of {owners.length} owner(s).</Text>

      {/* Continue button */}
      <Button
        onClick={async () => {
          setType(StepType.TRANSACTION);
        }}
        disabled={!owners.length}
      >
        Continue
      </Button>

      {/* Back button */}
      <Button
        onClick={async () => {
          setType(StepType.START);
        }}
      >
        Back
      </Button>
    </BaseModal>
  );
};
