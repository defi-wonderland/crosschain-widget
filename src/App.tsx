import "./App.css";
import { useEffect, useState } from "react";
import { providers } from "ethers";

import { ZodiacConnextWidget } from "./package";
import { isAddress } from "~/utils";

function App() {
  const [useModal, setUseModal] = useState(true);
  const [useLightTheme, setUseLightTheme] = useState(true);
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
      setSigner(provider.getSigner());
      setProvider(provider);
    }
  };

  useEffect(() => {
    signer?.getAddress().then((address) => {
      setUserAddress(address);
    });

    signer?.getChainId().then((chainId) => {
      setUserChainId(chainId);
    });
  }, [signer]);

  // autoconnect on load
  useEffect(() => {
    handleConnect();
  }, []);

  return (
    <div className="App">
      <h1>Zodiac-Connext Development Test App</h1>
      <button onClick={() => handleConnect()}>Connect</button>
      <button onClick={() => setUseModal(!useModal)}>
        Use modal: {useModal.toString()}
      </button>
      <button onClick={() => setUseLightTheme(!useLightTheme)}>
        Light theme: {useLightTheme.toString()}
      </button>

      <br />
      <br />
      <input placeholder="user address" value={userAddress} disabled={true} />
      {!isAddress(userAddress) && <p>invalid address</p>}
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
        />
      )}

      <br />
      <textarea
        value={tx}
        onChange={(e) => setTx(e.target.value)}
        style={{ width: 500, height: 250 }}
        placeholder="{value: string; to: string; from: string; data: string;}"
      />
      <br />
      {tx && (
        <button
          onClick={() => {
            signer?.sendTransaction(JSON.parse(tx));
          }}
        >
          Send tx
        </button>
      )}
      <br />
    </div>
  );
}

export default App;
