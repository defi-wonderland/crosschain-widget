import { useEffect } from "react";

import { ChainContainer, ChainOption } from "./StartStep.styles";
import { TokenIcon, Text, ArrowRight, Box } from "~/components";
import Dropdown from "~/components/Dropdown/Dropdown";
import { useDataContext } from "~/providers";

interface ChainSectionProps {
  setError?: (error: boolean) => void;
  disabled?: boolean;
  error?: boolean;
}

export const ChainSection = ({
  disabled = false,
  error,
  setError,
}: ChainSectionProps) => {
  const dropdownChainProps = Dropdown.useProps();

  const {
    setDestinyChain,
    destinyChain,
    lightTheme,
    originChainKey,
    originChainList,
    destinyChainList,
    testnet,
  } = useDataContext();

  const handleChainDropdown = (key: string) => {
    setDestinyChain(key);
    dropdownChainProps.setShow(false);
  };

  // If the originChain is not supported, we want to show an error
  useEffect(() => {
    if (setError) {
      originChainList[originChainKey]?.name ? setError(false) : setError(true);
    }
  }, [originChainList, originChainKey]);

  // If the originChain is equal to the destinyChain,
  // we want to set the destinyChain to the next chain in the list
  useEffect(() => {
    if (originChainKey === destinyChain) {
      setDestinyChain(Object.keys(destinyChainList)[1]);
    }
  }, [originChainKey, destinyChainList, testnet]);

  return (
    <ChainContainer>
      {/* Origin chain dropdown */}
      <Dropdown.Button title="From" error={error} disabled={true}>
        {!error && <TokenIcon chainName={originChainKey} />}
        <Text data-testid={"origin-chain"}>
          {error ? "Usupported Chain" : originChainList[originChainKey]?.name}
        </Text>
      </Dropdown.Button>

      <ArrowRight lightTheme={lightTheme} />

      {/* Destination chain dropdown */}
      <Dropdown {...dropdownChainProps}>
        <Dropdown.Button
          title="To"
          icon={!disabled && Object.keys(destinyChainList).length > 1}
          disabled={disabled || !(Object.keys(destinyChainList).length > 1)}
        >
          <TokenIcon chainName={destinyChain} />
          <Text>{destinyChainList[destinyChain]?.name}</Text>
        </Dropdown.Button>

        {Object.keys(destinyChainList).length > 1 && (
          <Dropdown.Modal>
            {Object.entries(destinyChainList).map(([key, value]) => (
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
        )}
      </Dropdown>
    </ChainContainer>
  );
};
