import { useEffect } from "react";

import { ChainContainer, ChainOption } from "./StartStep.styles";
import { TokenIcon, Text, ArrowRight, Box } from "~/components";
import Dropdown from "~/components/Dropdown/Dropdown";
import { useDataContext } from "~/providers";
import { getConstants } from "~/config";

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

  const { setDestinyChain, destinyChain, lightTheme, originChainKey } =
    useDataContext();

  const handleChainDropdown = (key: string) => {
    setDestinyChain(key);
    dropdownChainProps.setShow(false);
  };

  /* 
    If the originChain is not supported, we want to show an error
  */
  useEffect(() => {
    if (setError) {
      originChainKey ? setError(false) : setError(true);
    }
  }, [originChainKey]);

  return (
    <ChainContainer>
      {/* Origin chain dropdown */}
      <Dropdown.Button title="From" error={error} disabled={true}>
        {!!originChainKey && <TokenIcon chainName={originChainKey} />}
        <Text>{Chains[originChainKey]?.name || "Usupported Chain"}</Text>
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
              {key !== originChainKey && (
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
