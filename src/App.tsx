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
    </div>
  );
}

export default App;
