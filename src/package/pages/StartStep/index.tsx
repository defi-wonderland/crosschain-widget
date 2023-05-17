import { useEffect, useState } from "react";

import {
  SText,
  SafeContainer,
  ChainOption as SafeOption,
} from "./StartStep.styles";
import { useDataContext, useNavigationContext } from "~/providers";
import { BaseModal, Button, ModalProps, Text } from "~/components";
import { fetchData, getSafeAddressUrl, truncatedAddress } from "~/utils";
import Dropdown from "~/components/Dropdown/Dropdown";
import { ChainSection } from "./ChainSection";
import { StepType } from "~/types";

export const StartStep = ({ ...props }: ModalProps) => {
  const dropdownSafeProps = Dropdown.useProps();
  const { setType } = useNavigationContext();
  const { userAddress, destinyChain, setSafeAddress, safeAddress } =
    useDataContext();

  const [safeList, setSafeList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const hasModule = false;

  const getSafe = async () => {
    setLoading(true);
    try {
      const url = getSafeAddressUrl(destinyChain, userAddress);
      const jsonData = await fetchData(url);
      setSafeList(jsonData.safes);
      setSafeAddress(jsonData.safes[0]);
    } catch (error) {
      console.log("error getting safes");
      setSafeAddress("");
      setSafeList([]);
    }
    setLoading(false);
  };

  const handleSafeDropwdown = (safeAddress: string) => {
    setSafeAddress(safeAddress);
    dropdownSafeProps.setShow(false);
  };

  const handleUseExisting = () => {
    if (hasModule) {
      setType(StepType.TRANSACTION);
    } else {
      setType(StepType.MODULE_SETUP);
    }
  };

  useEffect(() => {
    getSafe();
  }, [destinyChain]);

  return (
    <BaseModal {...props} header="Cross chain action">
      <ChainSection />

      <SafeContainer>
        <Dropdown {...dropdownSafeProps}>
          <Dropdown.Button
            title="Input safe address"
            error={!safeAddress}
            errorMsg="Please enter a valid Safe address"
          >
            {/* Temporary: Set an input when it doesn't find any safe. */}
            <Text>
              {safeAddress ? truncatedAddress(safeAddress) : "No safe here"}
            </Text>
          </Dropdown.Button>

          {!!safeList.length && (
            <Dropdown.Modal>
              {safeList?.map((safeAddress) => (
                <SafeOption
                  key={safeAddress}
                  onClick={() => handleSafeDropwdown(safeAddress)}
                >
                  <Text>{truncatedAddress(safeAddress)}</Text>
                </SafeOption>
              ))}
            </Dropdown.Modal>
          )}
        </Dropdown>

        <Button disabled={!safeList.length} onClick={handleUseExisting}>
          Use existing
        </Button>
      </SafeContainer>

      <SText>Or</SText>
      <Button onClick={() => setType(StepType.SAFE_MODULE_CREATION)}>
        Create new Safe
      </Button>
    </BaseModal>
  );
};
