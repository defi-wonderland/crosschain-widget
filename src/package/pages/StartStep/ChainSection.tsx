import { useEffect } from "react";

import { ChainContainer, ChainOption } from "./StartStep.styles";
import { TokenIcon, Text, ArrowRight, Box } from "~/components";
import Dropdown from "~/components/Dropdown/Dropdown";
import { useDataContext } from "~/providers";
import { getConstants } from "~/config";
import { getChainKey } from "~/utils";

interface ChainSectionProps {
  disabled?: boolean;
  error?: boolean;
  setError?: (error: boolean) => void;
}

export const ChainSection = ({
  disabled = false,
  error,
  setError,
}: ChainSectionProps) => {
  const dropdownChainProps = Dropdown.useProps();
  const { Chains } = getConstants();

  const {
    setDestinyChain,
    destinyChain,
    originChainId: chainId,
    lightTheme,
  } = useDataContext();

  const chainKey = getChainKey(chainId!);
  const handleChainDropdown = (key: string) => {
    setDestinyChain(key);
    dropdownChainProps.setShow(false);
  };

  /* 
    If the originChain is ethereum, we want to set the destinyChain to
    the next chain in the list
  */
  useEffect(() => {
    if (chainKey === "ethereum") {
      setDestinyChain("polygon");
    }
  }, [chainKey]);

  /* 
    If the originChain is not supported, we want to show an error
  */
  useEffect(() => {
    if (setError) {
      chainKey ? setError(false) : setError(true);
    }
  }, [chainKey]);

  return (
    <ChainContainer>
      {/* Origin chain dropdown */}
      <Dropdown.Button title="From" error={error} disabled={true}>
        {!!chainKey && <TokenIcon chainName={chainKey} />}
        <Text>{Chains[chainKey]?.name || "Usupported Chain"}</Text>
      </Dropdown.Button>

      <ArrowRight lightTheme={lightTheme} />

      {/* Destination chain dropdown */}
      <Dropdown {...dropdownChainProps}>
        <Dropdown.Button title="To" icon={!disabled} disabled={disabled}>
          <TokenIcon chainName={destinyChain} />
          <Text>{Chains[destinyChain].name}</Text>
        </Dropdown.Button>

        <Dropdown.Modal>
          {Object.entries(Chains).map(([key, value]) => (
            <Box key={key}>
              {key !== chainKey && (
                <ChainOption
                  onClick={() => handleChainDropdown(key)}
                  active={destinyChain === key}
                >
                  <TokenIcon chainName={key} />
                  <Text>{value.name}</Text>
                </ChainOption>
              )}
            </Box>
          ))}
        </Dropdown.Modal>
      </Dropdown>
    </ChainContainer>
  );
};
