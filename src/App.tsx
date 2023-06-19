import "./App.css";
import { useEffect, useState } from "react";
import { providers } from "ethers";

import { ZodiacConnextWidget } from "./package";
import { isAddress } from "~/utils";

function App() {
  const [useModal, setUseModal] = useState(false);
  const [useSigner, setUseSigner] = useState(false);
  const [useTestnet, setUseTestnet] = useState(true);
  const [useLightTheme, setUseLightTheme] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [userChainId, setUserChainId] = useState(1);
  const [tx, setTx] = useState("");
  const [signer, setSigner] = useState<providers.JsonRpcSigner | undefined>();
  const [provider, setProvider] = useState<
    providers.JsonRpcProvider | undefined
  >();

  const handleConnect = async () => {
    if (window?.ethereum) {
      const provider = new providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();
      const address = (await signer.getAddress()) || "";
      const chainId = (await signer.getChainId()) || 1;
      setSigner(signer);
      setProvider(provider);
      setUserChainId(chainId);
      setUserAddress(address);
    }
  };

  const detectChainChange = async () => {
    window.ethereum.on("chainChanged", handleConnect);
  };

  useEffect(() => {
    detectChainChange();
    return () => {
      window.ethereum.removeListener("chainChanged", handleConnect);
    };
  }, []);

  // autoconnect on load
  useEffect(() => {
    handleConnect();
  }, []);

  return (
    <div className="App">
      <h1>Crosschain Governance Widget</h1>
      <h2>Development App</h2>
      {/* <button onClick={() => handleConnect()}>Connect</button> */}
      <br />
      {isAddress(userAddress) && (
        <ZodiacConnextWidget
          originAddress={userAddress}
          userChainId={userChainId}
          text="Open Modal"
          modal={useModal}
          setTx={setTx}
          provider={provider}
          lightTheme={useLightTheme}
          signer={useSigner ? signer : undefined}
          testnet={useTestnet}
        />
      )}

      {tx && (
        <>
          <br />
          <textarea
            value={tx}
            onChange={(e) => setTx(e.target.value)}
            style={{ width: 500, height: 250 }}
            placeholder="{value: string; to: string; from: string; data: string;}"
          />
          <br />
          <button
            onClick={() => {
              signer?.sendTransaction(JSON.parse(tx));
            }}
          >
            Send tx
          </button>
        </>
      )}
      <div>
        <br />
        <button onClick={() => setUseModal(!useModal)}>
          Use modal: {useModal.toString()}
        </button>
        <button onClick={() => setUseLightTheme(!useLightTheme)}>
          Light theme: {useLightTheme.toString()}
        </button>
      </div>
      <div>
        <button onClick={() => setUseSigner(!useSigner)}>
          Signer: {useSigner.toString()}
        </button>
        <button onClick={() => setUseTestnet(!useTestnet)}>
          Testnet: {useTestnet.toString()}
        </button>
      </div>

      <br />
      <p>Connected address: {userAddress}</p>
      <p>Connected to chainId: {userChainId}</p>
      <br />
    </div>
  );
}

export default App;
