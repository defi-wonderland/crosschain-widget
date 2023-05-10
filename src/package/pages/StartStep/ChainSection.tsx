import { ChainContainer, ChainOption } from "./StartStep.styles";
import { TokenIcon, Text, ArrowRight } from "~/components";
import Dropdown from "~/components/Dropdown/Dropdown";
import { useDataContext } from "~/providers";
import { getConstants } from "~/config";
import { getChainKey } from "~/utils";

interface ChainSectionProps {
  disabled?: boolean;
}

export const ChainSection = ({ disabled = false }: ChainSectionProps) => {
  const dropdownChainProps = Dropdown.useProps();
  const { Chains } = getConstants();

  const {
    setDestinyChain,
    destinyChain,
    originChainId: chainId,
    lightTheme,
  } = useDataContext();

  const chainKey = getChainKey(chainId!);
  const originChainName = Chains[chainKey].name;
  const handleChainDropdown = (key: string) => {
    setDestinyChain(key);
    dropdownChainProps.setShow(false);
  };
  return (
    <ChainContainer>
      <Dropdown.Button title="From">
        <TokenIcon chainName={originChainName} />
        <Text>{Chains[chainKey].name}</Text>
      </Dropdown.Button>

      <ArrowRight lightTheme={lightTheme} />

      <Dropdown {...dropdownChainProps}>
        <Dropdown.Button title="To" icon={!disabled} disabled={disabled}>
          <TokenIcon chainName={destinyChain} />
          <Text>{Chains[destinyChain].name}</Text>
        </Dropdown.Button>

        <Dropdown.Modal>
          {Object.entries(Chains).map(([key, value]) => (
            <>
              {value.name !== originChainName && (
                <ChainOption key={key} onClick={() => handleChainDropdown(key)}>
                  <TokenIcon chainName={key} />
                  <Text>{value.name}</Text>
                </ChainOption>
              )}
            </>
          ))}
        </Dropdown.Modal>
      </Dropdown>
    </ChainContainer>
  );
};
