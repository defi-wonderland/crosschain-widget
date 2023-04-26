import "./App.css";
import { useState } from "react";

import { ZodiacConnextWidget } from "./package";
import { isAddress } from "~/utils";

function App() {
  const [useModal, setUseModal] = useState(true);
  const [userAddress, setUserAddress] = useState("");
  return (
    <div className="App">
      <h1>Zodiac Develepment Test App</h1>
      <button onClick={() => setUseModal(!useModal)}>
        Use modal: {useModal.toString()}
      </button>

      <br />
      <br />
      <input
        placeholder="user address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
      />
      <ZodiacConnextWidget
        originAddress="0x0000000123123131"
        originChainId={55}
        text="Open Modal"
      />
      {!isAddress(userAddress) && <p>invalid address</p>}
      <br />
      <br />

      {isAddress(userAddress) && (
        <ZodiacConnextWidget
          originAddress={userAddress}
          originChainId={55}
          text="Open Modal"
          modal={useModal}
        />
      )}

      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
