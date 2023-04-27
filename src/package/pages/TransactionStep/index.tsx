import { useEffect, useState } from "react";
import { Interface, FunctionFragment } from "ethers/lib/utils.js";

import {
  BaseModal,
  Button,
  Dropdown,
  SInput,
  Text,
  STextArea,
} from "~/components";
import { ModalProps, StepType } from "~/types";
import { useNavigationContext, useDataContext } from "~/providers";
import { fetchData, isAddress, getContractAbiUrl } from "~/utils";

export const TransactionStep = ({ onClose, ...props }: ModalProps) => {
  const { setType } = useNavigationContext();
  const { destinyChain } = useDataContext();

  const [abiItem, setAbiItem] = useState("");
  const [method, setMethod] = useState<FunctionFragment | null>();
  const [contractAddress, setContractAddress] = useState("");
  const [contractInterface, setContractInterface] = useState<{
    [name: string]: FunctionFragment;
  } | null>();

  const [abiError, setAbiError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getContractAbi = async () => {
    setLoading(true);
    try {
      const url = getContractAbiUrl(destinyChain, contractAddress);
      const jsonData = await fetchData(url);
      setAbiItem(JSON.stringify(jsonData.contractAbi.abi));
    } catch (error) {
      console.log("error getting contract abi");
    }
    setLoading(false);
  };

  useEffect(() => {
    try {
      const iContract = new Interface(abiItem);
      setContractInterface(iContract.functions);
      setAbiError(false);
    } catch (error) {
      setAbiError(true);
      setContractInterface(null);
    }
  }, [abiItem]);

  useEffect(() => {
    if (isAddress(contractAddress)) {
      getContractAbi();
    }
  }, [contractAddress]);

  return (
    <BaseModal {...props} onClose={onClose} header="Transaction Input Setup">
      <Text>Enter Address</Text>
      <SInput
        placeholder="target contract address"
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <Text>Enter ABI</Text>
      <STextArea
        value={abiItem}
        onChange={(e) => setAbiItem(e.target.value)}
        disabled={loading}
      />
      {abiItem && abiError && <Text style={{ color: "red" }}>Invalid ABI</Text>}
      <br />
      {contractInterface && (
        <>
          <h1>Transaction Information</h1>

          {/* Selector */}
          <Text>Contract Method Selector</Text>
          <Dropdown
            name={"method"}
            onChange={(e) =>
              setMethod(
                Object.entries(contractInterface).filter(
                  (key) => key[1].name === e.target.value
                )[0][1]
              )
            }
          >
            {Object.entries(contractInterface).map((functionName) => (
              <>
                {/* Show only writable functions */}
                {(functionName[1].stateMutability === "payable" ||
                  functionName[1].stateMutability === "nonpayable") && (
                  <option
                    key={functionName[1].name}
                    value={functionName[1].name}
                  >
                    {functionName[1].name}
                  </option>
                )}
              </>
            ))}
          </Dropdown>

          {/* Parameters */}
          {method?.inputs.map((inputParam) => (
            <>
              <SInput
                key={inputParam.name}
                placeholder={`${inputParam.name || ""} (${inputParam.type})`}
              />
            </>
          ))}

          {/* Value */}
          {method?.payable && (
            <>
              <Text>value: </Text>
              <SInput placeholder="value" />
            </>
          )}
        </>
      )}
      <Button
        onClick={async () => {
          setType(StepType.XCALLDATA_REVIEW);
        }}
      >
        Continue
      </Button>
    </BaseModal>
  );
};
