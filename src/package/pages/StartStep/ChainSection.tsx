import { ArrowIcon, ChainContainer, ChainOption } from "./StartStep.styles";
import Dropdown from "~/components/Dropdown/Dropdown";
import { TokenIcon, Text } from "~/components";
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

      <ArrowIcon />

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
