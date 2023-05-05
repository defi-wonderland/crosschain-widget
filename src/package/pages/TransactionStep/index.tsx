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
import { isAddress, encodeFunction, getContractAbi } from "~/utils";

interface TxState {
  abiItem?: string;
  method?: FunctionFragment;
  contractAddress?: string;
  contractInterface?: Interface;
  paramsArray?: string[];
  encodedTx?: string;
  value?: string;
}

export const TransactionStep = ({ ...props }: ModalProps) => {
  const { setType } = useNavigationContext();
  const { destinyChain, txData, setTxData } = useDataContext();
  const [txState, setTxState] = useState<TxState>({});

  const [abiError, setAbiError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    abiItem,
    method,
    contractAddress,
    contractInterface,
    paramsArray,
    encodedTx,
    value,
  } = txState;

  const handleSetState = (newValue: TxState) => {
    setTxState({ ...txState, ...newValue });
  };

  const handleSetParam = (value: string, index: number) => {
    if (paramsArray) {
      const newParamsArray = [...paramsArray];
      newParamsArray[index] = value;
      handleSetState({ paramsArray: newParamsArray });
    }
  };

  useEffect(() => {
    if (abiItem) {
      try {
        const iContract = new Interface(abiItem);
        handleSetState({
          contractInterface: iContract,
          // set as default method the first writable method
          method: Object.entries(iContract.functions).filter(
            (key) =>
              key[1].stateMutability === "payable" ||
              key[1].stateMutability === "nonpayable"
          )[0][1],
        });

        setAbiError(false);
      } catch (error) {
        setAbiError(true);
        handleSetState({ contractInterface: undefined });
      }
    }
  }, [abiItem]);

  useEffect(() => {
    if (contractAddress && isAddress(contractAddress)) {
      setLoading(true);
      getContractAbi(destinyChain, contractAddress).then((abi) => {
        handleSetState({
          abiItem: abi,
        });
        setLoading(false);
      });
    }
  }, [contractAddress]);

  useEffect(() => {
    if (contractInterface && method && paramsArray) {
      const encondedFunction = encodeFunction(
        contractInterface,
        method,
        paramsArray
      );

      handleSetState({
        encodedTx: encondedFunction,
      });
    }
  }, [method, paramsArray]);

  useEffect(() => {
    if (method && encodedTx && contractAddress)
      setTxData({
        ...txData,
        to: contractAddress,
        value: value || "0",
        calldata: encodedTx,
        name: method?.name,
      });
  }, [encodedTx, value]);

  return (
    <BaseModal
      {...props}
      onBack={() => setType(StepType.START)}
      header="Transaction Builder"
    >
      <SInput
        title="Contract address"
        placeholder="target contract address"
        onChange={(e) => handleSetState({ contractAddress: e.target.value })}
      />
      <STextArea
        title="Input ABI"
        value={abiItem}
        onChange={(e) => handleSetState({ abiItem: e.target.value })}
        disabled={loading}
      />
      {abiItem && abiError && <Text style={{ color: "red" }}>Invalid ABI</Text>}

      {contractInterface?.functions && (
        <>
          <h1>Transaction Information</h1>

          {/* Selector */}
          <Dropdown
            title="Contract method selector"
            onChange={(e) => {
              handleSetState({
                paramsArray: [], // reset paramsArray before changing the method
                method: Object.entries(contractInterface.functions).filter(
                  (key) => key[1].name === e.target.value
                )[0][1],
              });
            }}
          >
            {Object.entries(contractInterface.functions).map((functionName) => (
              <>
                {/* Show only writable functions */}
                {(functionName[1].stateMutability === "payable" ||
                  functionName[1].stateMutability === "nonpayable") && (
                  <option
                    key={functionName[1].name + functionName[1].type}
                    value={functionName[1].name}
                  >
                    {functionName[1].name}
                  </option>
                )}
              </>
            ))}
          </Dropdown>

          {/* Parameters */}
          {method?.inputs.map((inputParam, index) => (
            <SInput
              key={inputParam.name}
              title={inputParam.name}
              placeholder={`${inputParam.type}`}
              onChange={(e) => {
                handleSetParam(e.target.value, index);
              }}
            />
          ))}

          {/* Value */}
          {method?.payable && (
            <SInput
              title="Value"
              placeholder="value"
              value={value}
              onChange={(e) =>
                setTxState({ ...txState, value: e.target.value })
              }
            />
          )}
        </>
      )}
      <Button
        onClick={async () => {
          setType(StepType.XCALLDATA_REVIEW);
        }}
        disabled={!encodedTx || !contractAddress}
      >
        Continue
      </Button>
    </BaseModal>
  );
};
