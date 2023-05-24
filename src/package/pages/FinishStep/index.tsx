import { useEffect, useState } from "react";

import { useDataContext, useNavigationContext } from "~/providers";
import { BaseModal, Button, PoweredByConnext } from "~/components";
import { ChainSection } from "~/pages/StartStep/ChainSection";
import { ModalProps, StepType, TxData } from "~/types";
import { getConstants } from "~/config";
import { TxSummary } from "./TxSummary";
import {
  encodeReceiverCallData,
  estimateRelayerFee,
  encodeXCall,
  getChainKey,
} from "~/utils";

interface FinishState {
  relayerFee?: string;
  xCallJson: TxData;
  xCallParams?: string[];
}

export const FinishStep = ({ ...props }: ModalProps) => {
  const [showDestination, setShowDestination] = useState(false);
  const [showOrigin, setShowOrigin] = useState(false);
  const { Chains } = getConstants();
  const { setType } = useNavigationContext();
  const {
    originChainId,
    setTx,
    provider,
    txData,
    userAddress,
    destinyChain,
    lightTheme,
    modal: isModal,
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
    let receiverCalldata = "0x";
    if (txData) {
      receiverCalldata = encodeReceiverCallData(
        txData.to,
        txData.value,
        txData.data
      );
    }

    /* xCallParams:
      0: destination domaninId
      1: ZodiacConnextModule (temporary random address)
      2: asset
      3: delegate
      4: amount
      5: slippage
      6: callData
    */
    const xCallParams = [
      Chains[destinyChain].domainId.toString(),
      "0xC55b9BE4B5959afeb1938e2A1498F69124042294",
      Chains[originChainName].assets.TEST ||
        Chains[originChainName].assets.WETH,
      userAddress,
      "0",
      "0",
      receiverCalldata || "0x",
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

  const getTransactionJson = (data: TxData) => {
    return JSON.stringify({
      to: data.to,
      from: data.from,
      value: data.value,
      data: data.data,
    });
  };

  const handleConfirm = () => {
    setTx(getTransactionJson(xCallJson));
    setType(isModal ? StepType.None : StepType.START);
  };

  useEffect(() => {
    if (!relayerFee) {
      estimateRelayerFee(provider!, originChainName).then((rFee) => {
        const { xCallParams, xCallJson } = getParams(rFee.toString());
        setFinishState({
          ...finishState,
          relayerFee: rFee.toString(),
          xCallJson,
          xCallParams,
        });
      });
    }
  }, []);

  return (
    <BaseModal
      {...props}
      // onBack={() => setType(StepType.TRANSACTION)}
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
        value={xCallJson.value}
        textTitle="xCall Data"
        showDetails={showOrigin}
        setShowDetails={setShowOrigin}
      />

      <TxSummary
        title="Destination Transaction"
        txData={txData!}
        origin={"ZodiacModule Address or Safe Address"}
        destiny={txData?.to || ""}
        value={txData?.value || ""}
        textTitle="Data"
        showDetails={showDestination}
        setShowDetails={setShowDestination}
      />

      <Button onClick={handleConfirm}>Confirm</Button>

      <PoweredByConnext lightTheme={lightTheme} />
    </BaseModal>
  );
};
