import { useEffect, useState } from "react";
import { providers } from "ethers";

import { BaseModal, Button, SInput, STextArea, Text } from "~/components";
import { ModalProps, StepType } from "~/types";
import { useDataContext, useNavigationContext } from "~/providers";
import { copyData, estimateRelayerFee, encodeXCall } from "~/utils";
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

export const FinishStep = ({ onClose, ...props }: ModalProps) => {
  const destinyChainName = "arbitrum";
  const provider = new providers.JsonRpcProvider("https://eth.llamarpc.com");

  const { setType } = useNavigationContext();
  const { owners, threshold, txData } = useDataContext();
  const { Chains } = getConstants();

  const [copied, setCopied] = useState(false);
  const [finishState, setFinishState] = useState<FinishState>({});
  const { relayerFee, transactionJson } = finishState;

  const handleCopy = async () => {
    setCopied(true);
    copyData(JSON.stringify(txData));

    setTimeout(() => {
      setCopied(false);
    }, 2000);

    const relayerFee = await getRelayerFee();
    // temporary
    console.log(owners, threshold, txData, relayerFee);
  };

  // temporary
  const getRelayerFee = async () => {
    const provider = new providers.JsonRpcProvider("https://eth.llamarpc.com");
    const relayerFee = await estimateRelayerFee(provider, "mainnet");
    return relayerFee;
  };

  const getParams = (relayerFee: string) => {
    // temporary fixed values
    const xCallParams = [
      Chains[destinyChainName].domainId.toString(), // destination domaninId
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // zodiacConnextModule or destinySafe address
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // asset
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // delegate
      "0", // amount
      "0", // slippage
      txData?.calldata || "0x", // calldata
    ];

    const encodedData = encodeXCall(xCallParams);

    const transactionJson = {
      value: relayerFee,
      to: Chains[destinyChainName].connextContract, // Connext contract address
      from: "0x690B9A9E9aa1C9dB991C7721a92d351Db4FaC990", // user address (temporary random address with ETH now)
      data: encodedData, // encoded data (xcall)
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
    <BaseModal {...props} onClose={onClose} header="xCallData Confirmation">
      <br />
      <Text>Origin chain: Ethereum</Text>
      <Text>Origin sender: 0x000000000000000000000000000001</Text>
      <Text>Destination chain: Optimism</Text>
      <Text>Destination sender: 0x000000000000000000000000000001</Text>
      <br />
      <h1>Transaction Information</h1>
      <Text>to:</Text>
      <SInput
        placeholder="param 1"
        value={"0x0000000000000000000000000000"}
        disabled
      />
      <Text>value:</Text>
      <SInput placeholder="param 2" value={"1.00"} disabled />
      <Text>xCallData parameters:</Text>
      <STextArea
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
          setType(StepType.None);
        }}
      >
        Confirm
      </Button>
      <Button
        onClick={async () => {
          setType(StepType.TRANSACTION);
        }}
      >
        Back
      </Button>
    </BaseModal>
  );
};
