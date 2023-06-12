import { useEffect, useState } from "react";

import { useDataContext, useNavigationContext } from "~/providers";
import { BaseModal, Button, Text, SInput, Box } from "~/components";
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
  ThresholdOption,
} from "./SafeSettings.styles";

interface SafeSettingsState {
  inputAddress?: string;
  isRepeated?: boolean;
  ownersIndex?: number;
  isValid?: boolean;
}

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
    setCreateSafe,
  } = useDataContext();

  const [safeState, setSafeState] = useState<SafeSettingsState>({
    inputAddress: userAddress,
    isRepeated: false,
    ownersIndex: 0,
    isValid: true,
  });

  const { isValid, ownersIndex, isRepeated, inputAddress } = safeState;

  const handleSetState = (newState: SafeSettingsState) => {
    setSafeState({ ...safeState, ...newState });
  };

  const removeItem = (item: string) => {
    const index = owners.indexOf(item);
    const newAddresses = owners;
    newAddresses.splice(index, 1);
    setOwners(newAddresses);

    handleSetState({
      inputAddress: owners[owners.length - 1],
      ownersIndex: ownersIndex! - 1,
    });
  };

  const addOwner = () => {
    handleSetState({
      inputAddress: "",
      ownersIndex: ownersIndex! + 1,
    });
    const newAddresses = [...owners];
    newAddresses.push("");
    setOwners([...newAddresses]);
  };

  const handleSelectThreshold = (index: number) => {
    setThreshold(index + 1);
    ownersProps.setShow(false);
  };

  const handleNewOwner = (ownerAddress: string) => {
    handleSetState({
      inputAddress: ownerAddress,
      isRepeated: getIsRepeated(ownerAddress),
      isValid: isAddress(ownerAddress) && !getIsRepeated(ownerAddress),
    });

    const newAddresses = [...owners];
    newAddresses[ownersIndex!] = ownerAddress;
    setOwners([...newAddresses]);
  };

  const getIsRepeated = (address: string) => {
    return (
      owners.length > 1 &&
      !!owners.find(
        (ownerAddress) => ownerAddress.toLowerCase() === address.toLowerCase()
      )
    );
  };

  const isDisabled = () => {
    return !isValid || !inputAddress;
  };

  const isYourConnectedWallet = () => {
    return (
      userAddress.toLowerCase() === inputAddress?.toLowerCase() &&
      isValid &&
      !isRepeated
    );
  };

  useEffect(() => {
    setCreateSafe(true);
    handleNewOwner(userAddress);
  }, []);

  return (
    <BaseModal
      {...props}
      onBack={() => setType(StepType.START)}
      header="Safe Configuration"
    >
      <OwnersContainer>
        {/* Owners Section */}
        {owners.length > 1 &&
          owners.map((address, index) => (
            <Box key={address + index}>
              {index + 1 !== owners.length && (
                <OnwersList>
                  <SInput title="Owner address" value={address} disabled />
                  {index !== 0 && (
                    <DeleteButton onClick={() => removeItem(address)}>
                      <TrashIcon lightTheme={lightTheme} />
                    </DeleteButton>
                  )}
                </OnwersList>
              )}
            </Box>
          ))}

        <OnwersList>
          <SInput
            title="Owner address"
            placeholder="Input Owner Address"
            value={inputAddress}
            onChange={(e) => handleNewOwner(e.target.value)}
            error={!isValid || isRepeated}
            errorMsg={
              isRepeated ? "Owner is already added" : "Invalid Ethereum Address"
            }
            dataTestId="Owner address"
          />
          {owners.length > 1 && (
            <DeleteButton onClick={() => removeItem(inputAddress!)}>
              <TrashIcon lightTheme={lightTheme} />
            </DeleteButton>
          )}
        </OnwersList>
        {isYourConnectedWallet() && (
          <YourWalletMsg>Your connected wallet address</YourWalletMsg>
        )}
      </OwnersContainer>

      <AddOwnerButton onClick={addOwner} disabled={isDisabled()}>
        + Add a new owner
      </AddOwnerButton>

      {/* Threshold Section */}
      <h1>Threshold</h1>

      <Text>Any transaction requires the confirmation of:</Text>
      <ThresoldContainer>
        <Dropdown {...ownersProps}>
          <Dropdown.Button title="#" icon={true} disabled={!owners.length}>
            <Text>{threshold || owners.length}</Text>
          </Dropdown.Button>
          {!!owners.length && (
            <Dropdown.Modal>
              {owners.map((value, index) => (
                <ThresholdOption
                  key={index + 1}
                  active={index + 1 == threshold}
                >
                  <Text onClick={() => handleSelectThreshold(index)}>
                    {index + 1}
                  </Text>
                </ThresholdOption>
              ))}
            </Dropdown.Modal>
          )}
        </Dropdown>
        <Text>out of {owners.length} owner(s).</Text>
      </ThresoldContainer>

      {/* Continue button */}
      <Button
        onClick={() => setType(StepType.TRANSACTION)}
        disabled={isDisabled()}
      >
        Continue
      </Button>
    </BaseModal>
  );
};
