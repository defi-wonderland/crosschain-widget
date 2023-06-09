# Cross-chain Governance Widget

The Cross-chain Governance Widget is a user-friendly React component library that enables users to deploy and manage their Avatar's Zodiac Connext Module and easily build the transaction data required for executing desired actions through an `xcall` function in Connext.

## Development

To set up the development environment, first clone the repository:

```bash
git clone [this repo link] && cd [this repo name]
```

### Local environment

Install dependencies:

```bash
yarn
```

Start the testing app:

```bash
yarn dev
```

The app should be live at [http://localhost:5173/](http://localhost:5173/).

## Production

To build the production-ready version, run the following command:

```bash
yarn build
```

Now you can use [yarn link](https://classic.yarnpkg.com/lang/en/docs/cli/link/) to test the library.

You can also run `yarn build:dev` and `yarn preview` to use the built-in application to try out the widget.

## Example

To use the Crosschain Widget in your React application, import the `ZodiacConnextWidget` component from the package and provide the required props.

```jsx
import { ZodiacConnextWidget } from "crosschain-widget";

// Inside your React component
const MyComponent = () => {
  const handleTransaction = (tx) => {
    // Handle the transaction data
  };

  return (
    <ZodiacConnextWidget
      originAddress="0x123abc..."
      userChainId={1}
      setTx={handleTransaction}
      text="Open Widget Modal!"
      modal={true}
      provider={myProviderInstance}
      lightTheme={true}
    />
  );
};
```

Please note that you need to provide appropriate values for the `originAddress`, `userChainId`, `setTx`, and `provider` props according to your application's requirements.

## Props

The following props are available for the `ZodiacConnextWidget` component:

| Property              | Description                                                                                                | Type                        | Default value                |
| --------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------- |
| originAddress         | The origin address associated with the user's account                                                      | `string`                    | N/A                          |
| userChainId           | The chain ID of the user's blockchain network                                                              | `number`                    | N/A                          |
| setTx                 | A callback function that receives the transaction data after submission                                    | `(tx: string) => void`      | N/A                          |
| text (optional)       | The text to display on the widget button                                                                   | `string`                    | `"Cross-Chain Widget"`       |
| provider (optional)   | An instance of the `providers.JsonRpcProvider` from [ethers.js](https://docs.ethers.org/v5/api/providers/) | `providers.JsonRpcProvider` | `undefined`                  |
| modal (optional)      | Flag to enable or disable modal behavior for the widget                                                    | `boolean`                   | `true`                       |
| className (optional)  | classname to add styles to open modal button                                                               | `string`                    | `"crosschain-widget-button"` |
| lightTheme (optional) | Flag to enable a light theme for the widget                                                                | `boolean`                   | `false`                      |
| alchemyKey (optional) | [Alchemy](https://www.alchemy.com/) API Key                                                                | `string`                    | `undefined`                  |
| infuraKey (optional)  | [Infura](https://www.infura.io/) API Key                                                                   | `string`                    | `undefined`                  |

## Live example

You can find the example implementation repository [here](https://github.com/defi-wonderland/crosschain-widget-example) and the live code example [here](https://codesandbox.io/p/github/defi-wonderland/crosschain-widget-example).

## License

This project is licensed under the [AGPL-3.0-only License](LICENSE).
