import { useCallback, useEffect, useState } from "react";
import { utils } from "ethers";

import { Button, BaseModal, PoweredByConnext } from "~/components";
import { useDataContext, useNavigationContext } from "~/providers";
import { ChainSection } from "~/pages/StartStep/ChainSection";
import { ModalProps, StepType, Tx, TxData } from "~/types";
import { getConstants } from "~/config";
import { TxSummary } from "./TxSummary";
import {
  encodeReceiverCallData,
  estimateRelayerFee,
  encodeXCall,
  encodeInitializer,
  encodeCreateSafe,
  getSaltNonce,
  getTransactionJson,
} from "~/utils";

interface FinishState {
  relayerFee?: string;
  xCallJson: TxData;
  xCallParams?: string[];
}

export const FinishStep = ({ ...props }: ModalProps) => {
  const [showDestination, setShowDestination] = useState(false);
  const [invalidChain, setInvalidChain] = useState(false);
  const [showOrigin, setShowOrigin] = useState(false);
  const [sendMessage, setSendMessage] = useState("Send transaction");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { Chains } = getConstants();
  const { setType } = useNavigationContext();
  const {
    originChainKey,
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

  const getParams = (relayerFee: string) => {
    const to = createSafe ? Chains[destinyChain].ZCMFactory : connextModule;
    const asset =
      Chains[originChainKey].assets.WETH || Chains[originChainKey].assets.TEST;
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
      to: Chains[originChainKey].connextContract,
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
        originDomainId: Chains[originChainKey].domainId,
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

  // function called when the user clicks on the "Send transaction" button
  const handleConfirm = () => {
    const txResult = getTransactionJson(xCallJson);

    if (signer) {
      setLoading(true);
      // if the user is not in the right network, we ask him to switch
      if (invalidChain) {
        signer.provider
          .send("wallet_switchEthereumChain", [
            { chainId: utils.hexValue(Chains[originChainKey].id) },
          ])
          .then(() => {
            setLoading(false);
            setSendMessage("Send transaction");
          })
          .catch(() => {
            setLoading(false);
            setError(true);
            setErrorMessage("Network change rejected");
          });
      } else {
        // if the user is in the right network, send the transaction
        handleSendTransaction(txResult);
      }
    } else {
      // if the user doesn't have signer, we just return the stringified transaction
      setTx(JSON.stringify(txResult));
      setType(isModal ? StepType.None : StepType.START);
    }
  };

  // function to exceute the transaction
  const handleSendTransaction = useCallback(
    (txResult: Tx) => {
      if (signer) {
        signer
          .sendTransaction(txResult)
          .then(() => {
            setLoading(false);
            setError(false);
            // after sending the transaction, we go back to the start
            setType(isModal ? StepType.None : StepType.START);
          })
          .catch(() => {
            setError(true);
            setLoading(false);
            setErrorMessage("Something went wrong");
          });
      }
    },
    [signer]
  );

  // check if the user is in the right network
  useEffect(() => {
    if (signer) {
      signer.getChainId().then((chainId) => {
        if (chainId != Chains[originChainKey].id) {
          setInvalidChain(true);
          setSendMessage(`Switch to ${Chains[originChainKey].name}`);
        } else {
          setInvalidChain(false);
        }
      });
    }
  }, [signer, error]);

  // get the relayer fee
  useEffect(() => {
    if (!relayerFee) {
      estimateRelayerFee(provider!, originChainKey, createSafe)
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

  // show the error message for 3 seconds
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

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
        destiny={Chains[originChainKey]?.connextContract}
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

      <Button
        loading={loading}
        disabled={loading}
        onClick={handleConfirm}
        error={error}
      >
        {!error && !signer && "Confirm"}
        {!error && signer && sendMessage}
        {error && errorMessage}
      </Button>

      <PoweredByConnext lightTheme={lightTheme} />
    </BaseModal>
  );
};
