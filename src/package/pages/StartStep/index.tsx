import { useEffect, useState } from "react";

import { useDataContext, useNavigationContext } from "~/providers";
import { BaseModal, Button, Text } from "~/components";
import { fetchData, getSafeAddressUrl } from "~/utils";
import { ModalProps, StepType } from "~/types";
import Dropdown from "~/components/Dropdown/Dropdown";
import { ChainOption, SafeContainer } from "./StartStep.styles";
import { ChainSection } from "./ChainSection";

export const StartStep = ({ ...props }: ModalProps) => {
  const dropdownSafeProps = Dropdown.useProps();
  const { setType } = useNavigationContext();
  const { userAddress, destinyChain } = useDataContext();

  const [safeList, setSafeList] = useState<string[]>([]);
  const [safeAddress, setSafe] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const hasModule = true;

  const getSafe = async () => {
    setLoading(true);
    try {
      const url = getSafeAddressUrl(destinyChain, userAddress);
      const jsonData = await fetchData(url);
      setSafeList(jsonData.safes);
      setSafe(jsonData.safes[0]);
    } catch (error) {
      console.log("error getting safes");
      setSafe("");
    }
    setLoading(false);
  };

  const handleSafeDropwdown = (safeAddress: string) => {
    setSafe(safeAddress);
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
          <Dropdown.Button title="Input safe address">
            {/* Temporary: Set an input when it doesn't find any safe. */}
            <Text>{safeAddress || "No safe here"}</Text>
          </Dropdown.Button>

          {!!safeList.length && (
            <Dropdown.Modal>
              {safeList?.map((safeAddress) => (
                <ChainOption
                  key={safeAddress}
                  onClick={() => handleSafeDropwdown(safeAddress)}
                >
                  <Text>{safeAddress}</Text>
                </ChainOption>
              ))}
            </Dropdown.Modal>
          )}
        </Dropdown>

        <Button onClick={handleUseExisting}>Use existing</Button>
      </SafeContainer>

      <Text>Or</Text>
      <Button onClick={() => setType(StepType.SAFE_MODULE_CREATION)}>
        Create new Safe
      </Button>
    </BaseModal>
  );
};
