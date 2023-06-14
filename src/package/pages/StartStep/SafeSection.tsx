import { useEffect, useState } from "react";

import {
  SafeContainer,
  SafeOption,
  WriteIcon,
  CustomInput,
} from "./StartStep.styles";
import {
  isAddress,
  truncatedAddress,
  getIsModuleEnabled,
  getModuleFromSafe,
} from "~/utils";
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
    setConnextModule,
  } = useDataContext();
  const { setType } = useNavigationContext();
  const dropdownSafeProps = Dropdown.useProps();

  const [showCustomAddress, setShowCustomAddress] = useState(true);
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
    const moduleAddress = await getModuleFromSafe(safeAddress, destinyProvider);

    const isModuleEnabled = await getIsModuleEnabled(
      safeAddress,
      moduleAddress,
      destinyProvider
    );

    setConnextModule(moduleAddress);
    setHasModule(isModuleEnabled);
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

  // if the user dont have any safe, show the custom address input
  useEffect(() => {
    if (!safeList.length) {
      setShowCustomAddress(true);
    } else {
      setShowCustomAddress(false);
    }
  }, [safeList]);

  return (
    <>
      <SafeContainer>
        <Dropdown {...dropdownSafeProps}>
          <Dropdown.Button
            title="Safe address"
            error={safeError}
            errorMsg="Invalid Safe address"
            icon={safeList.length > 0}
          >
            {!showCustomAddress && (
              <Text>{safeAddress ? truncatedAddress(safeAddress) : ""}</Text>
            )}
            {showCustomAddress && (
              <CustomInput
                value={customAddress}
                ref={(input) => input && input.focus()}
                onChange={(e) => handleCustomAddress(e.target.value)}
              />
            )}
          </Dropdown.Button>

          {safeList.length !== 0 && (
            <Dropdown.Modal>
              {safeList?.map((sAddress) => (
                <SafeOption
                  key={sAddress}
                  onClick={() => handleDropwdown(sAddress)}
                  active={sAddress === safeAddress}
                >
                  <Text>{truncatedAddress(sAddress)}</Text>
                </SafeOption>
              ))}
              <SafeOption onClick={handleShowCustomAddress}>
                <WriteIcon lightTheme={lightTheme} />
                <Text>Add custom address</Text>
              </SafeOption>
            </Dropdown.Modal>
          )}
        </Dropdown>

        <Button
          disabled={safeError || !safeAddress || loading || error}
          loading={loading}
          onClick={handleUseExisting}
        >
          Use Safe
        </Button>
      </SafeContainer>
    </>
  );
};
