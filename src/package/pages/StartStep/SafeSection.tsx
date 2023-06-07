import { useEffect, useState } from "react";

import {
  SafeContainer,
  SafeOption,
  WriteIcon,
  CustomInput,
} from "./StartStep.styles";
import { isAddress, truncatedAddress, getIsModuleEnabled } from "~/utils";
import { useDataContext, useNavigationContext } from "~/providers";
import Dropdown from "~/components/Dropdown/Dropdown";
import { Button, Text } from "~/components";
import { StepType } from "~/types";

interface SafeSectionProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  safeList: string[];
  setSafeList: (safeList: string[]) => void;
  error?: boolean;
  setError?: (error: boolean) => void;
}

export const SafeSection = ({
  loading,
  setLoading,
  safeList,
  error,
}: SafeSectionProps) => {
  const {
    setSafeAddress,
    safeAddress,
    lightTheme,
    destinyChain,
    destinyProvider,
  } = useDataContext();
  const { setType } = useNavigationContext();
  const dropdownSafeProps = Dropdown.useProps();

  const [showCustomAddress, setShowCustomAddress] = useState(false);
  const [customAddress, setCustomAddress] = useState("");
  const [safeError, setSafeError] = useState(false);
  const [hasModule, setHasModule] = useState(false);

  const handleDropwdown = (safeAddress: string) => {
    setSafeAddress(safeAddress);
    dropdownSafeProps.setShow(false);
  };

  const handleShowCustomAddress = () => {
    setShowCustomAddress(!showCustomAddress);
    dropdownSafeProps.setShow(false);
  };

  const handleCustomAddress = (value: string) => {
    setSafeError(true);
    setCustomAddress(value);
    dropdownSafeProps.setShow(false);

    if (isAddress(value)) {
      setSafeAddress(value);
      setSafeError(false);
    }
  };

  const handleUseExisting = async () => {
    if (hasModule) {
      setType(StepType.TRANSACTION);
    } else {
      setType(StepType.MODULE_SETUP);
    }
  };

  const checkHasModule = async () => {
    setLoading(true);
    const hasModule = await getIsModuleEnabled(
      safeAddress,
      "0xC55b9BE4B5959afeb1938e2A1498F69124042294", // TODO: Change to fetched module address
      destinyProvider
    );
    setHasModule(hasModule);
    setLoading(false);
  };

  useEffect(() => {
    // Reset all values when changing chain
    setShowCustomAddress(false);
    setCustomAddress("");
    setSafeError(false);
  }, [destinyChain]);

  useEffect(() => {
    if (safeAddress) checkHasModule();
  }, [safeAddress]);

  return (
    <>
      <SafeContainer>
        <Dropdown {...dropdownSafeProps}>
          <Dropdown.Button
            title="Input safe address"
            error={safeError}
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
          disabled={safeError || !safeAddress || loading || error}
          loading={loading}
          onClick={handleUseExisting}
        >
          Use existing
        </Button>
      </SafeContainer>
    </>
  );
};
