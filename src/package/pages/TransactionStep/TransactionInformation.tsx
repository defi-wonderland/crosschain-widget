import { FunctionFragment, Interface } from "ethers/lib/utils";
import styled from "styled-components";

import Dropdown from "~/components/Dropdown/Dropdown";
import { TxState } from "~/pages/TransactionStep";
import { Text } from "~/components";

export const TransactionTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin: 12px 0 0px;

  & section button,
  & section {
    width: 100%;
  }

  & section section {
    margin-top: -10px;
    max-height: 140px;
  }

  & section section p {
    text-align: start;
    margin: 8px 0;
    cursor: pointer;
    padding: 4px 12px;
    transition: transform 200ms;

    &:hover {
      transform: scale(1.01);
    }
  }
`;

interface TransactionInformationProps {
  contractInterface: Interface;
  method?: FunctionFragment;
  handleSetState: (newValue: TxState) => void;
}

export const TransactionInformation = ({
  contractInterface,
  method,
  handleSetState,
}: TransactionInformationProps) => {
  const methodDropdownProps = Dropdown.useProps();

  const filterMethod = (contractInterface: Interface, method: string) => {
    return Object.entries(contractInterface.functions).filter(
      (key) => key[1].name === method
    )[0][1];
  };

  const filterWritableMethods = (method: [string, FunctionFragment]) => {
    return (
      method[1].stateMutability === "payable" ||
      method[1].stateMutability === "nonpayable"
    );
  };

  const handleClick = (methodName: string, signature: string) => {
    methodDropdownProps.setShow(false);
    handleSetState({
      paramsArray: [], // reset paramsArray before changing the method
      method: filterMethod(contractInterface, methodName),
      methodSignature: signature,
    });
  };

  return (
    <TransactionTitleContainer>
      <Dropdown {...methodDropdownProps}>
        <Dropdown.Button title="Contract method selector" icon={true}>
          <Text>{method?.name}</Text>
        </Dropdown.Button>

        <Dropdown.Modal>
          {Object.entries(contractInterface.functions).map((functionName) => (
            <div key={functionName[1].name}>
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
            </div>
          ))}
        </Dropdown.Modal>
      </Dropdown>
    </TransactionTitleContainer>
  );
};
