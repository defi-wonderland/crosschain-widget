import { useEffect, useState } from "react";

import { BaseModal, Button, SInput, STextArea, Text } from "~/components";
import { useDataContext, useNavigationContext } from "~/providers";
import { ModalProps, StepType } from "~/types";
import { getConstants } from "~/config";
import {
  copyData,
  encodeReceiverCallData,
  estimateRelayerFee,
  encodeXCall,
  getChainKey,
} from "~/utils";

interface FinishState {
  relayerFee?: string;
  transactionJson?: {
    value: string;
    to: string;
    from: string;
    data: string;
  };
  xCallParams?: string[];
}

export const FinishStep = ({ ...props }: ModalProps) => {
  const { setType } = useNavigationContext();
  const { originChainId, setTx, provider } = useDataContext();
  const { Chains } = getConstants();
  const { txData, userAddress, destinyChain } = useDataContext();

  const [copied, setCopied] = useState(false);
  const [finishState, setFinishState] = useState<FinishState>({});
  const { relayerFee, transactionJson } = finishState;

  const originChainName = getChainKey(originChainId);
  const handleCopy = async () => {
    setCopied(true);
    copyData(JSON.stringify(txData));

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const getParams = (relayerFee: string) => {
    let receiverCalldata = "0x";
    if (txData) {
      receiverCalldata = encodeReceiverCallData(
        txData.to,
        txData.value,
        txData.calldata
      );
    }

    console.log("receiver calldata:", receiverCalldata);

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
      onBack={() => setType(StepType.TRANSACTION)}
      header="xCallData Confirmation"
    >
      <br />
      <Text>Origin chain: Ethereum</Text>
      <Text>Origin sender: 0x000000000000000000000000000001</Text>
      <Text>Destination chain: Optimism</Text>
      <Text>Destination sender: 0x000000000000000000000000000001</Text>
      <br />
      <h1>Transaction Information</h1>
      <SInput
        title="To"
        placeholder="param 1"
        value={"0x0000000000000000000000000000"}
        disabled
      />
      <Text>value:</Text>
      <SInput placeholder="param 2" value={"1.00"} disabled />
      <STextArea
        title="xCallData parameters"
        wrap="on"
        value={`xcall:
      ${JSON.stringify(transactionJson)}
      
destiny transaction:
      ${JSON.stringify(txData)}`}
        disabled
      />
      <Button onClick={() => handleCopy()}>Copy Data</Button>
      {copied && <Text>Copied to clipboard!</Text>}
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
