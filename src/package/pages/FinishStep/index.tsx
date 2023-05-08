import { useEffect, useState } from "react";
import { providers } from "ethers";

import { BaseModal, Button, SInput, STextArea, Text } from "~/components";
import { ModalProps, StepType } from "~/types";
import { useDataContext, useNavigationContext } from "~/providers";
import {
  copyData,
  estimateRelayerFee,
  encodeXCall,
  getChainKey,
} from "~/utils";
import { getConstants } from "~/config/constants";

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
  const provider = new providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
  );

  const { setType } = useNavigationContext();
  const { originChainId, setTx } = useDataContext();
  const { Chains } = getConstants();
  const { owners, threshold, txData, userAddress, destinyChain } =
    useDataContext();

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

    const relayerFee = await estimateRelayerFee(provider, originChainName);

    // temporary
    console.log(owners, threshold, txData, relayerFee);
  };
  const getParams = (relayerFee: string) => {
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
      "0x48268230fda49480579f8843c368e5f7138f4767",
      Chains[originChainName].assets.TEST,
      userAddress,
      "0",
      "0",
      txData?.calldata || "0x",
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
      estimateRelayerFee(provider, "mainnet").then((rFee) => {
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
