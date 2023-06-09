import { useCallback, useEffect } from "react";
import { FunctionFragment } from "ethers/lib/utils";
import { utils } from "ethers";

import { encodeFunction, getParams } from "~/utils";
import { TxState } from "~/pages/TransactionStep";
import { SInput, STextArea } from "~/components";
import { useDataContext } from "~/providers";

interface TransactionParamsProps {
  txState: TxState;
  showCustomData: boolean;
  setTxState: (newValue: TxState) => void;
  handleSetState: (newValue: TxState) => void;
}

export const TransactionParams = ({
  txState,
  showCustomData,
  setTxState,
  handleSetState,
}: TransactionParamsProps) => {
  const { setTxData, txData } = useDataContext();
  const {
    contractInterface,
    method,
    paramsArray,
    encodedTx,
    value,
    customData,
    methodSignature,
    contractAddress,
  } = txState;

  const handleSetParam = (value: string, index: number) => {
    const newParamsArray = [...(paramsArray || [])];
    newParamsArray[index] = value;
    handleSetState({ paramsArray: newParamsArray });
  };

  // Callback to encode the destination transaction
  const updateEncodedTx = useCallback(() => {
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

  /* 
    Callback to update the destination transaction json and
    the required params to format the data in the summary
  */
  const updateTxData = useCallback(() => {
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

  useEffect(() => {
    updateEncodedTx();
    updateTxData();
  }, [updateEncodedTx, updateTxData]);

  return (
    <>
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
          title="Value (wei)"
          placeholder="0"
          value={value || ""}
          type="number"
          onChange={(e) => setTxState({ ...txState, value: e.target.value })}
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
  );
};
