import { useEffect, useState } from "react";
import { Interface, FunctionFragment } from "ethers/lib/utils.js";
import { utils } from "ethers";

import {
  BaseModal,
  Button,
  SInput,
  Text,
  STextArea,
  Toggle,
} from "~/components";
import { ModalProps, StepType } from "~/types";
import { useNavigationContext, useDataContext } from "~/providers";
import {
  isAddress,
  encodeFunction,
  getContractAbi,
  getParams,
  getFirstWritableMethod,
} from "~/utils";
import { TransactionTitleContainer } from "./Transaction.styles";
import { TransactionInformation } from "./TransactionInformation";

export interface TxState {
  abiItem?: string;
  method?: FunctionFragment;
  contractAddress?: string;
  contractInterface?: Interface;
  paramsArray?: string[];
  encodedTx?: string;
  value?: string;
  customData?: string;
  methodSignature?: string;
}

export const TransactionStep = ({ ...props }: ModalProps) => {
  const { setType } = useNavigationContext();
  const { destinyChain, txData, setTxData } = useDataContext();
  const [txState, setTxState] = useState<TxState>({});

  const [abiError, setAbiError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCustomData, setShowCustomData] = useState(false);

  const {
    abiItem,
    method,
    contractAddress,
    contractInterface,
    paramsArray,
    encodedTx,
    value,
    customData,
    methodSignature,
  } = txState;

  const handleSetState = (newValue: TxState) => {
    setTxState({ ...txState, ...newValue });
  };

  const handleSetParam = (value: string, index: number) => {
    const newParamsArray = [...(paramsArray || [])];
    newParamsArray[index] = value;
    handleSetState({ paramsArray: newParamsArray });
  };

  useEffect(() => {
    if (abiItem) {
      try {
        const iContract = new Interface(abiItem);
        handleSetState({
          contractInterface: iContract,
          // set as default methodSignature the first writable method
          methodSignature: getFirstWritableMethod(iContract.functions)[0],
          // set as default method the first writable method
          method: getFirstWritableMethod(iContract.functions)[1],
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
    if ((contractAddress && customData) || (contractAddress && encodedTx)) {
      const name = showCustomData ? customData?.slice(0, 10) : methodSignature;
      const data = encodedTx || customData;

      // if custom data, we don't need to get the calldatas (params)
      const calldatas = !customData
        ? getParams(method as FunctionFragment, paramsArray || [])
        : undefined;

      setTxData({
        ...txData,
        to: contractAddress,
        value: value || "0",
        data: data || "",
        name: name || "",
        calldatas,
      });
    }
  }, [encodedTx, value, customData]);

  return (
    <BaseModal
      {...props}
      onBack={() => setType(StepType.START)}
      header="Transaction Builder"
    >
      <SInput
        title="Contract address"
        value={contractAddress || ""}
        placeholder="target contract address"
        onChange={(e) => handleSetState({ contractAddress: e.target.value })}
        error={!!contractAddress && !isAddress(contractAddress)}
        errorMsg="Invalid contract address"
      />
      <STextArea
        title="Input ABI"
        value={abiItem || ""}
        onChange={(e) => handleSetState({ abiItem: e.target.value })}
        disabled={loading}
        error={!!abiItem && abiError}
        errorMsg="Invalid ABI"
      />

      {contractInterface?.functions && (
        <>
          <TransactionTitleContainer>
            <h1>Transaction Information</h1>
            <div>
              <Toggle onClick={() => setShowCustomData(!showCustomData)} />
              <Text>Custom Data</Text>
            </div>
          </TransactionTitleContainer>

          {/* Selector */}
          {!showCustomData && (
            <TransactionInformation
              contractInterface={contractInterface}
              handleSetState={handleSetState}
              method={method}
            />
          )}

          {/* Parameters */}
          {!showCustomData &&
            method?.inputs.map((inputParam, index) => (
              <SInput
                key={inputParam.name}
                title={inputParam.name}
                placeholder={`${inputParam.type}`}
                onChange={(e) => handleSetParam(e.target.value, index)}
              />
            ))}

          {/* Value */}
          {(method?.payable || showCustomData) && (
            <SInput
              title="Value"
              placeholder="value"
              value={value || ""}
              type="number"
              onChange={(e) =>
                setTxState({ ...txState, value: e.target.value })
              }
            />
          )}

          {/* Custom Data */}
          {showCustomData && (
            <STextArea
              title="Data"
              value={customData}
              onChange={(e) =>
                setTxState({ ...txState, customData: e.target.value })
              }
              placeholder="Hex encoded"
              error={!!customData?.length && !utils.isBytesLike(customData)}
              errorMsg="Invalid hex data"
            />
          )}
        </>
      )}
      <Button
        onClick={() => setType(StepType.XCALLDATA_REVIEW)}
        disabled={!txData?.data}
      >
        Continue
      </Button>
    </BaseModal>
  );
};
