import { useEffect, useState } from "react";

import { useDataContext, useNavigationContext } from "~/providers";
import { BaseModal, Button, Text, TokenIcon } from "~/components";
import { fetchData, getSafeAddressUrl, getChainKey } from "~/utils";
import { ModalProps, StepType } from "~/types";
import { getConstants } from "~/config";
import Dropdown from "~/components/Dropdown/Dropdown";
import {
  ArrowIcon,
  ChainContainer,
  ChainOption,
  SafeContainer,
} from "./StartStep.styles";

export const StartStep = ({ ...props }: ModalProps) => {
  const dropdownChainProps = Dropdown.useProps();
  const dropdownSafeProps = Dropdown.useProps();
  const { Chains } = getConstants();
  const { setType } = useNavigationContext();
  const {
    userAddress,
    setDestinyChain,
    destinyChain,
    originChainId: chainId,
  } = useDataContext();

  const [safeList, setSafeList] = useState<string[]>([]);
  const [safeAddress, setSafe] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const hasModule = true;

  // find origin chain name
  const chainKey = getChainKey(chainId!);
  const originChainName = Chains[chainKey].name;

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

  const handleChainDropdown = (key: string) => {
    setDestinyChain(key);
    dropdownChainProps.setShow(false);
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
      <ChainContainer>
        <Dropdown.Button title="From">
          <TokenIcon chainName={originChainName} />
          <Text>{Chains[chainKey].name}</Text>
        </Dropdown.Button>

        <ArrowIcon />

        <Dropdown {...dropdownChainProps}>
          <Dropdown.Button title="To" icon={true}>
            <TokenIcon chainName={destinyChain} />
            <Text>{Chains[destinyChain].name}</Text>
          </Dropdown.Button>

          <Dropdown.Modal>
            {Object.entries(Chains).map(([key, value]) => (
              <>
                {value.name !== originChainName && (
                  <ChainOption
                    key={key}
                    onClick={() => handleChainDropdown(key)}
                  >
                    <TokenIcon chainName={key} />
                    <Text>{value.name}</Text>
                  </ChainOption>
                )}
              </>
            ))}
          </Dropdown.Modal>
        </Dropdown>
      </ChainContainer>

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
