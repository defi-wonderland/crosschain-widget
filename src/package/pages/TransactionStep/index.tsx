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
import { isAddress, getContractAbi, getFirstWritableMethod } from "~/utils";
import { useNavigationContext, useDataContext } from "~/providers";
import { TransactionTitleContainer } from "./Transaction.styles";
import { TransactionDropdown } from "./TransactionDropdown";
import { TransactionParams } from "./TransactionParams";
import { ModalProps, StepType } from "~/types";

export interface TxState {
  abiItem?: string;
  method?: FunctionFragment;
  contractAddress?: string;
  contractInterface?: Interface;
  paramsArray?: string[];
  encodedTx?: string;
  txValue?: string;
  customData?: string;
  methodSignature?: string;
  showCustomData?: boolean;
}

export const TransactionStep = ({ ...props }: ModalProps) => {
  const { setType } = useNavigationContext();
  const {
    destinyChain,
    destinationTxData,
    lightTheme,
    createSafe,
    setDestinationTxData,
  } = useDataContext();
  const [txState, setTxState] = useState<TxState>({
    showCustomData: false,
  });

  const [abiError, setAbiError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    abiItem,
    method,
    contractAddress,
    contractInterface,
    showCustomData,
  } = txState;

  const handleSetState = (newValue: TxState) => {
    const newState = { ...txState, ...newValue };
    setTxState(newState);
  };

  const handleToggle = () => {
    // Reset the state
    const newState = { ...txState, showCustomData: !showCustomData };
    delete newState.paramsArray;
    delete newState.encodedTx;
    setTxState(newState);
    setDestinationTxData(undefined);
  };

  // Get the ABI from the contract address
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

  // Get the contract interface from the ABI
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

  // Reset txData when the modal is open (when the user clicks Back on the final step)
  useEffect(() => {
    setDestinationTxData(undefined);
  }, []);

  return (
    <BaseModal
      {...props}
      onBack={() =>
        setType(createSafe ? StepType.SAFE_MODULE_CREATION : StepType.START)
      }
      header="Transaction Builder"
      initialHeight={515}
      finalHeight={abiItem && !abiError ? 700 : undefined}
    >
      <SInput
        title="Contract address"
        value={contractAddress || ""}
        onChange={(e) => handleSetState({ contractAddress: e.target.value })}
        error={!!contractAddress && !isAddress(contractAddress)}
        errorMsg="Invalid address"
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
              <Toggle onClick={handleToggle} />
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
            txState={txState}
          />
        </>
      )}
      <Button
        onClick={() => setType(StepType.XCALLDATA_REVIEW)}
        disabled={!destinationTxData?.data}
        loading={loading}
      >
        Continue
      </Button>
      <PoweredByConnext lightTheme={lightTheme} />
    </BaseModal>
  );
};
