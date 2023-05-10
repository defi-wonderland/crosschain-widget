import { useEffect, useState } from "react";

import { useDataContext, useNavigationContext } from "~/providers";
import { ChainSection } from "~/pages/StartStep/ChainSection";
import { BaseModal, Button } from "~/components";
import { ModalProps, StepType } from "~/types";
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
  transactionJson: {
    value: string;
    to: string;
    from: string;
    data: string;
  };
  xCallParams?: string[];
}

export const FinishStep = ({ ...props }: ModalProps) => {
  const { Chains } = getConstants();
  const { setType } = useNavigationContext();
  const { originChainId, setTx, provider, txData, userAddress, destinyChain } =
    useDataContext();

  const [finishState, setFinishState] = useState<FinishState>({
    transactionJson: { value: "", to: "", from: "", data: "" },
  });
  const { relayerFee, transactionJson } = finishState;

  const originChainName = getChainKey(originChainId);

  const getParams = (relayerFee: string) => {
    let receiverCalldata = "0x";
    if (txData) {
      receiverCalldata = encodeReceiverCallData(
        txData.to,
        txData.value,
        txData.calldata
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
      Chains[originChainName].assets.TEST,
      userAddress,
      "0",
      "0",
      receiverCalldata || "0x",
    ];

    const encodedData = encodeXCall(xCallParams);

    const transactionJson = {
      value: relayerFee,
      to: Chains[originChainName].connextContract,
      from: userAddress,
      data: encodedData,
    };

    return { xCallParams, transactionJson };
  };

  useEffect(() => {
    if (!relayerFee) {
      estimateRelayerFee(provider!, originChainName).then((rFee) => {
        const { xCallParams, transactionJson } = getParams(rFee.toString());
        setFinishState({
          ...finishState,
          relayerFee: rFee.toString(),
          transactionJson,
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
    >
      <ChainSection disabled />

      <TxSummary
        title="Origin Transaction"
        data={JSON.stringify(transactionJson)}
        origin={userAddress}
        destiny={Chains[originChainName].connextContract}
        value={transactionJson.value}
        textTitle="xCall Data"
      />

      <TxSummary
        title="Destination Transaction"
        data={JSON.stringify(txData)}
        origin={"ZodiacModule Address or Safe Address"}
        destiny={txData?.to || ""}
        value={txData?.value || ""}
        textTitle="Data"
      />

      <Button
        onClick={async () => {
          setTx(JSON.stringify(transactionJson));
          setType(StepType.None);
        }}
      >
        Confirm
      </Button>
    </BaseModal>
  );
};
