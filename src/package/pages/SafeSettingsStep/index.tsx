import { useEffect, useState } from "react";

import { useDataContext, useNavigationContext } from "~/providers";
import { BaseModal, Button, Text, SInput } from "~/components";
import Dropdown from "~/components/Dropdown/Dropdown";
import { ModalProps, StepType } from "~/types";
import { isAddress } from "~/utils";
import {
  AddOwnerButton,
  DeleteButton,
  OnwersList,
  OwnersContainer,
  ThresoldContainer,
  TrashIcon,
  YourWalletMsg,
} from "./SafeSettings.styles";

export const SafeSettingsStep = ({ ...props }: ModalProps) => {
  const ownersProps = Dropdown.useProps();
  const { setType } = useNavigationContext();
  const {
    setOwners,
    setThreshold,
    owners,
    userAddress,
    threshold,
    lightTheme,
  } = useDataContext();

  const [inputAddress, setInputAddress] = useState<string>(userAddress);
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

  const handleSelectThreshold = (index: number) => {
    setThreshold((index + 1).toString());
    ownersProps.setShow(false);
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
    <BaseModal
      {...props}
      onBack={() => setType(StepType.START)}
      header="Safe Configuration"
    >
      <OwnersContainer>
        {/* Owners Section */}
        {owners.map((address) => (
          <OnwersList key={address}>
            <SInput title="Owner address" value={address} disabled />
            <DeleteButton onClick={() => removeItem(address)}>
              <TrashIcon lightTheme={lightTheme} />
            </DeleteButton>
          </OnwersList>
        ))}

        <SInput
          title="Owner address"
          placeholder="Input Owner Address"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          error={!isValid}
          errorMsg="Invalid Ethereum Address"
          dataTestId="Owner address"
        />
        {userAddress === inputAddress && isValid && (
          <YourWalletMsg>Your connected wallet address</YourWalletMsg>
        )}
      </OwnersContainer>

      <AddOwnerButton
        onClick={() => addOwner()}
        disabled={!isValid || !inputAddress}
      >
        + Add a new owner
      </AddOwnerButton>

      {/* Threshold Section */}
      <h1>Threshold</h1>

      <Text>Any transaction requires the confirmation of:</Text>
      <ThresoldContainer>
        <Dropdown {...ownersProps}>
          <Dropdown.Button title="#" icon={true}>
            <Text>{threshold || owners.length}</Text>
          </Dropdown.Button>
          {!!owners.length && (
            <Dropdown.Modal>
              {owners.map((value, index) => (
                <Text
                  key={index + 1}
                  onClick={() => handleSelectThreshold(index)}
                >
                  {index + 1}
                </Text>
              ))}
            </Dropdown.Modal>
          )}
        </Dropdown>
        <Text>out of {owners.length} owner(s).</Text>
      </ThresoldContainer>

      {/* Continue button */}
      <Button
        onClick={() => setType(StepType.TRANSACTION)}
        disabled={!owners.length}
      >
        Continue
      </Button>
    </BaseModal>
  );
};
