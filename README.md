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

## License

This project is licensed under the [AGPL-3.0-only License](LICENSE).
