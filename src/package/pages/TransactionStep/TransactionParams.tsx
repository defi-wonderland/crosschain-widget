import { useEffect } from "react";
import { FunctionFragment } from "ethers/lib/utils";
import { utils } from "ethers";

import { ParamsContainer } from "./Transaction.styles";
import { encodeFunction, getParams } from "~/utils";
import { TxState } from "~/pages/TransactionStep";
import { STextArea, SInput } from "~/components";
import { useDataContext } from "~/providers";

interface TransactionParamsProps {
  txState: TxState;
  handleSetState: (newValue: TxState) => void;
}

export const TransactionParams = ({
  txState,
  handleSetState,
}: TransactionParamsProps) => {
  const { setTxData, txData } = useDataContext();
  const {
    contractInterface,
    method,
    paramsArray,
    encodedTx,
    txValue,
    customData,
    methodSignature,
    contractAddress,
    showCustomData,
  } = txState;

  const handleSetParam = (value: string, index: number) => {
    const newParamsArray = [...(paramsArray || [])];
    newParamsArray[index] = value;
    handleSetState({ paramsArray: newParamsArray });
  };

  // Encode the destination transaction
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

  /* 
    Update the destination transaction json and
    the required params to format the data in the summary
  */
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
        value: txValue || "0",
        data: data || "",
        name: name || "",
        calldatas,
      });
    }
  }, [encodedTx, txValue, customData]);

  return (
    <ParamsContainer>
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
          value={txValue}
          type="number"
          onChange={(e) => handleSetState({ txValue: e.target.value })}
        />
      )}

      {/* Custom Data */}
      {showCustomData && (
        <STextArea
          title="Data"
          value={customData}
          onChange={(e) => handleSetState({ customData: e.target.value })}
          placeholder="Hex encoded"
          error={!!customData?.length && !utils.isBytesLike(customData)}
          errorMsg="Invalid hex data"
        />
      )}
    </ParamsContainer>
  );
};
