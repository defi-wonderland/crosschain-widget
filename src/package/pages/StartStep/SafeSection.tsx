import { useEffect, useState } from "react";

import {
  SafeContainer,
  SafeOption,
  WriteIcon,
  CustomInput,
} from "./StartStep.styles";
import { useDataContext, useNavigationContext } from "~/providers";
import { isAddress, truncatedAddress } from "~/utils";
import Dropdown from "~/components/Dropdown/Dropdown";
import { Button, Text } from "~/components";
import { StepType } from "~/types";

interface SafeSectionProps {
  loading: boolean;
  safeList: string[];
  setSafeList: (safeList: string[]) => void;
}

export const SafeSection = ({ loading, safeList }: SafeSectionProps) => {
  const { setSafeAddress, safeAddress, lightTheme, destinyChain } =
    useDataContext();
  const { setType } = useNavigationContext();
  const dropdownSafeProps = Dropdown.useProps();
  const hasModule = false;

  const [showCustomAddress, setShowCustomAddress] = useState(false);
  const [customAddress, setCustomAddress] = useState("");
  const [error, setError] = useState(false);

  const handleDropwdown = (safeAddress: string) => {
    setSafeAddress(safeAddress);
    dropdownSafeProps.setShow(false);
  };

  const handleShowCustomAddress = () => {
    setShowCustomAddress(!showCustomAddress);
    dropdownSafeProps.setShow(false);
  };

  const handleCustomAddress = (value: string) => {
    setError(true);
    setCustomAddress(value);
    dropdownSafeProps.setShow(false);

    if (isAddress(value)) {
      setSafeAddress(value);
      setError(false);
    }
  };

  const handleUseExisting = () => {
    if (hasModule) {
      setType(StepType.TRANSACTION);
    } else {
      setType(StepType.MODULE_SETUP);
    }
  };

  useEffect(() => {
    setShowCustomAddress(false);
    setCustomAddress("");
  }, [destinyChain]);

  return (
    <>
      <SafeContainer>
        <Dropdown {...dropdownSafeProps}>
          <Dropdown.Button
            title="Input safe address"
            error={error}
            errorMsg="Please enter a valid Safe address"
            icon={true}
          >
            {!showCustomAddress && (
              <Text>
                {safeAddress ? truncatedAddress(safeAddress) : "No safe here"}
              </Text>
            )}
            {showCustomAddress && (
              <CustomInput
                placeholder="Custom Address"
                value={customAddress}
                ref={(input) => input && input.focus()}
                onChange={(e) => handleCustomAddress(e.target.value)}
              />
            )}
          </Dropdown.Button>

          <Dropdown.Modal>
            {safeList?.map((safeAddress) => (
              <SafeOption
                key={safeAddress}
                onClick={() => handleDropwdown(safeAddress)}
              >
                <Text>{truncatedAddress(safeAddress)}</Text>
              </SafeOption>
            ))}
            <SafeOption onClick={handleShowCustomAddress}>
              <WriteIcon lightTheme={lightTheme} />
              <Text>Add custom address</Text>
            </SafeOption>
          </Dropdown.Modal>
        </Dropdown>

        <Button
          disabled={error || !safeAddress || loading}
          onClick={handleUseExisting}
        >
          Use existing
        </Button>
      </SafeContainer>
    </>
  );
};
