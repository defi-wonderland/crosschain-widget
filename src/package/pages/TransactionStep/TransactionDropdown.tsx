import { FunctionFragment, Interface } from "ethers/lib/utils";

import { DropdownContainer, MethodOption } from "./Transaction.styles";
import { filterMethod, filterWritableMethods } from "~/utils";
import Dropdown from "~/components/Dropdown/Dropdown";
import { TxState } from "~/pages/TransactionStep";
import { Text } from "~/components";

interface TransactionDropdownProps {
  contractInterface: Interface;
  method?: FunctionFragment;
  handleSetState: (newValue: TxState) => void;
}

export const TransactionDropdown = ({
  contractInterface,
  method,
  handleSetState,
}: TransactionDropdownProps) => {
  const methodDropdownProps = Dropdown.useProps();

  const handleClick = (methodName: string, signature: string) => {
    methodDropdownProps.setShow(false);
    handleSetState({
      paramsArray: [], // reset paramsArray before changing the method
      method: filterMethod(contractInterface, methodName),
      methodSignature: signature,
    });
  };

  return (
    <DropdownContainer>
      <Dropdown {...methodDropdownProps}>
        <Dropdown.Button title="Contract method selector" icon={true}>
          <Text>{method?.name}</Text>
        </Dropdown.Button>

        <Dropdown.Modal>
          {Object.entries(contractInterface.functions).map((functionName) => (
            <MethodOption
              key={functionName[1].name}
              active={functionName[1].name === method?.name}
            >
              {/* Show only writable functions */}
              {filterWritableMethods(functionName) && (
                <Text
                  onClick={() =>
                    handleClick(functionName[1].name, functionName[0])
                  }
                >
                  {functionName[1].name}
                </Text>
              )}
            </MethodOption>
          ))}
        </Dropdown.Modal>
      </Dropdown>
    </DropdownContainer>
  );
};
