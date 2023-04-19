import "./App.css";
import { ZodiacConnextWidget } from "./package";

function App() {
  return (
    <div className="App">
      <h1>Vite + React</h1>

      <ZodiacConnextWidget
        originAddress="0x0000000"
        originChainId={1}
        text="Open Modal"
      />

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
