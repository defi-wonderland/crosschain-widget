import { useEffect, useState } from "react";
import { Interface, FunctionFragment } from "ethers/lib/utils.js";

import {
  BaseModal,
  Button,
  SInput,
  Text,
  STextArea,
  Toggle,
  PoweredByConnext,
  Box,
} from "~/components";
import { ModalProps, StepType } from "~/types";
import { useNavigationContext, useDataContext } from "~/providers";
import { TransactionTitleContainer } from "./Transaction.styles";
import { TransactionDropdown } from "./TransactionDropdown";
import { TransactionParams } from "./TransactionParams";
import { isAddress, getContractAbi, getFirstWritableMethod } from "~/utils";

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
  const { destinyChain, txData, lightTheme, createSafe } = useDataContext();
  const [txState, setTxState] = useState<TxState>({});

  const [abiError, setAbiError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCustomData, setShowCustomData] = useState(false);

  const { abiItem, method, contractAddress, contractInterface } = txState;

  const handleSetState = (newValue: TxState) => {
    setTxState({ ...txState, ...newValue });
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

  return (
    <BaseModal
      {...props}
      onBack={() =>
        setType(createSafe ? StepType.SAFE_MODULE_CREATION : StepType.START)
      }
      header="Transaction Builder"
      initialHeight={515}
      finalHeight={abiItem ? 700 : undefined}
    >
      <SInput
        title="Contract address"
        value={contractAddress || ""}
        onChange={(e) => handleSetState({ contractAddress: e.target.value })}
        error={!!contractAddress && !isAddress(contractAddress)}
        errorMsg="Invalid contract address"
        dataTestId="Contract address"
      />
      <STextArea
        title="Input ABI"
        value={abiItem || ""}
        onChange={(e) => handleSetState({ abiItem: e.target.value })}
        disabled={loading}
        error={!!abiItem && abiError}
        errorMsg="Invalid ABI"
        dataTestId="Input ABI"
      />

      {contractInterface?.functions && (
        <>
          <TransactionTitleContainer>
            <h1>Transaction Information</h1>
            <Box>
              <Toggle onClick={() => setShowCustomData(!showCustomData)} />
              <Text>Custom Data</Text>
            </Box>
          </TransactionTitleContainer>

          {/* Method Selector */}
          {!showCustomData && (
            <TransactionDropdown
              contractInterface={contractInterface}
              handleSetState={handleSetState}
              method={method}
            />
          )}

          {/* Parameters */}
          <TransactionParams
            handleSetState={handleSetState}
            setTxState={setTxState}
            txState={txState}
            showCustomData={showCustomData}
          />
        </>
      )}
      <Button
        onClick={() => setType(StepType.XCALLDATA_REVIEW)}
        disabled={!txData?.data}
        loading={loading}
      >
        Continue
      </Button>
      <PoweredByConnext lightTheme={lightTheme} />
    </BaseModal>
  );
};
