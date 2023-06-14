import { useEffect, useState } from "react";

import { Button, BaseModal, PoweredByConnext } from "~/components";
import { useDataContext, useNavigationContext } from "~/providers";
import { ChainSection } from "~/pages/StartStep/ChainSection";
import { ModalProps, StepType, TxData } from "~/types";
import { getConstants } from "~/config";
import { TxSummary } from "./TxSummary";
import {
  encodeReceiverCallData,
  estimateRelayerFee,
  encodeXCall,
  getChainKey,
  encodeInitializer,
  encodeCreateSafe,
  getSaltNonce,
} from "~/utils";

interface FinishState {
  relayerFee?: string;
  xCallJson: TxData;
  xCallParams?: string[];
}

export const FinishStep = ({ ...props }: ModalProps) => {
  const [showDestination, setShowDestination] = useState(false);
  const [showOrigin, setShowOrigin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { Chains } = getConstants();
  const { setType } = useNavigationContext();
  const {
    originChainId,
    setTx,
    provider,
    destinationTxData,
    userAddress,
    destinyChain,
    lightTheme,
    modal: isModal,
    createSafe,
    owners,
    threshold,
    connextModule,
    signer,
  } = useDataContext();

  const [finishState, setFinishState] = useState<FinishState>({
    xCallJson: {
      value: "",
      to: "",
      from: "",
      data: "",
    },
  });
  const { relayerFee, xCallJson } = finishState;

  const originChainName = getChainKey(originChainId);

  const getParams = (relayerFee: string) => {
    const to = createSafe ? Chains[destinyChain].ZCMFactory : connextModule;
    const asset =
      Chains[originChainName].assets.WETH ||
      Chains[originChainName].assets.TEST;
    const calldata = getReceiverCallData();

    /* xCallParams:
      0: destination domaninId
      1: to (ZodiacConnextModule | ZodiacConnextModuleFactory)
      2: asset
      3: delegate
      4: amount
      5: slippage
      6: callData
    */

    const xCallParams = [
      Chains[destinyChain].domainId.toString(),
      to,
      asset,
      userAddress,
      "0",
      "0",
      calldata,
    ];

    const { encodedData, params, signature } = encodeXCall(xCallParams);

    const xCallJson: TxData = {
      name: signature,
      value: relayerFee,
      to: Chains[originChainName].connextContract,
      from: userAddress,
      data: encodedData,
      calldatas: params,
    };

    return { xCallParams, xCallJson };
  };

  const getReceiverCallData = () => {
    let receiverCalldata = "0x";
    if (destinationTxData) {
      receiverCalldata = encodeReceiverCallData(
        destinationTxData.to,
        destinationTxData.value,
        destinationTxData.data
      );
    }

    if (createSafe) {
      const initializerData = encodeInitializer({
        owners,
        threshold,
        connextFactory: Chains[destinyChain].ZCMFactory,
      });

      const createSafeData = encodeCreateSafe({
        userAddress: userAddress,
        originDomainId: Chains[originChainName].domainId,
        initializer: initializerData,
        destinationConnext: Chains[destinyChain].connextContract,
        saltNonce1: getSaltNonce(),
        saltNonce2: getSaltNonce(),
        destinationSafeMasterCopy: Chains[destinyChain].safeMasterCopy,
        safeTransactionData: receiverCalldata,
      });

      return createSafeData;
    } else {
      return receiverCalldata;
    }
  };

  const getTransactionJson = (data: TxData) => {
    return {
      to: data.to,
      from: data.from,
      value: data.value,
      data: data.data,
    };
  };

  const handleConfirm = () => {
    const txResult = getTransactionJson(xCallJson);

    if (signer) {
      setLoading(true);
      signer
        .sendTransaction(txResult)
        .then(() => {
          setLoading(false);
          setType(isModal ? StepType.None : StepType.START);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
          setError(true);
        });
    } else {
      setTx(JSON.stringify(txResult));
      setType(isModal ? StepType.None : StepType.START);
    }
  };

  useEffect(() => {
    if (!relayerFee) {
      estimateRelayerFee(provider!, originChainName, createSafe)
        .then((rFee) => {
          const { xCallParams, xCallJson } = getParams(rFee.toString());
          setFinishState({
            ...finishState,
            relayerFee: rFee.toString(),
            xCallJson,
            xCallParams,
          });
          setLoading(false);
        })
        .catch((e) => {
          console.log("Error: ", e);
          setLoading(false);
          setError(true);
        });
    }
  }, []);

  return (
    <BaseModal
      {...props}
      onBack={() => setType(StepType.TRANSACTION)}
      header="Transaction Confirmation"
      initialHeight={452}
      finalHeight={showDestination || showOrigin ? 700 : undefined}
    >
      <ChainSection disabled />

      <TxSummary
        title="Origin Transaction"
        txData={xCallJson}
        origin={userAddress}
        destiny={Chains[originChainName]?.connextContract}
        txValue={xCallJson.value}
        textTitle="xCall Data"
        showDetails={showOrigin}
        setShowDetails={setShowOrigin}
      />

      <TxSummary
        title="Destination Transaction"
        txData={destinationTxData!}
        origin={createSafe ? Chains[destinyChain].ZCMFactory : connextModule}
        destiny={destinationTxData?.to || ""}
        txValue={destinationTxData?.value || ""}
        textTitle="Data"
        showDetails={showDestination}
        setShowDetails={setShowDestination}
      />

      <Button loading={loading} disabled={loading} onClick={handleConfirm}>
        {!error && !signer && "Confirm"}
        {!error && signer && "Send transaction"}
        {error && "Something went wrong"}
      </Button>

      <PoweredByConnext lightTheme={lightTheme} />
    </BaseModal>
  );
};
