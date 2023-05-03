import { Constants } from "~/types";

export const getConstants = (): Constants => {
  return {
    // See: https://docs.connext.network/resources/supported-chains#mainnet
    Chains: {
      mainnet: {
        name: "Ethereum",
        id: 1,
        domainId: 6648936,
        connextContract: "0x8898B472C54c31894e3B9bb83cEA802a5d0e63C6",
        assets: {
          USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        },
      },
      polygon: {
        name: "Polygon",
        id: 137,
        domainId: 1886350457,
        connextContract: "0x11984dc4465481512eb5b777E44061C158CF2259",
        assets: {
          nextUSDC: "0xF96C6d2537e1af1a9503852eB2A4AF264272a5B6",
          USDC: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
          nextWETH: "0x4b8BaC8Dd1CAA52E32C07755c17eFadeD6A0bbD0",
          WETH: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
          nextDAI: "0xaDCe87b14d570665222C1172D18a221BF7690d5a",
          DAI: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
          nextUSDT: "0xE221C5A2a8348f12dcb2b0e88693522EbAD2690f",
          USDT: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        },
      },
      optimism: {
        name: "Optimism",
        id: 10,
        domainId: 1869640809,
        connextContract: "0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA",
        assets: {
          nextUSDC: "0x67E51f46e8e14D4E4cab9dF48c59ad8F512486DD",
          USDC: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
          nextWETH: "0xbAD5B3c68F855EaEcE68203312Fd88AD3D365e50",
          WETH: "0x4200000000000000000000000000000000000006",
          nextDAI: "0xd64Bd028b560bbFc732eA18f282c64B86F3468e0",
          DAI: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
          nextUSDT: "0x4cBB28FA12264cD8E87C62F4E1d9f5955Ce67D20",
          USDT: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
        },
      },
      arbitrum: {
        name: "Arbitrum One",
        id: 42161,
        domainId: 1634886255,
        connextContract: "0xEE9deC2712cCE65174B561151701Bf54b99C24C8",
        assets: {
          nextUSDC: "0x8c556cF37faa0eeDAC7aE665f1Bb0FbD4b2eae36",
          USDC: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
          nextWETH: "0x2983bf5c334743Aa6657AD70A55041d720d225dB",
          WETH: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
          nextDAI: "0xfDe99b3B3fbB69553D7DaE105EF34Ba4FE971190",
          DAI: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
          nextUSDT: "0x2fD7E61033b3904c65AA9A9B83DCd344Fa19Ffd2",
          USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        },
      },
      gnosisChain: {
        name: "Gnosis Chain",
        id: 100,
        domainId: 6778479,
        connextContract: "0x5bB83e95f63217CDa6aE3D181BA580Ef377D2109",
        assets: {
          nextUSDC: "0x44CF74238d840a5fEBB0eAa089D05b763B73faB8",
          USDC: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
          nextWETH: "0x538E2dDbfDf476D24cCb1477A518A82C9EA81326",
          WETH: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
          nextDAI: "0x0e1D5Bcd2Ac5CF2f71841A9667afC1E995CaAf4F",
          DAI: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d",
          nextUSDT: "0xF4d944883D6FddC56d3534986feF82105CaDbfA1",
          USDT: "0x4ECaBa5870353805a9F068101A40E0f32ed605C6",
        },
      },
      bnbChain: {
        name: "BNB Chain",
        id: 56,
        domainId: 6450786,
        connextContract: "0xCd401c10afa37d641d2F594852DA94C700e4F2CE",
        assets: {
          nextUSDC: "0x5e7D83dA751F4C9694b13aF351B30aC108f32C38",
          USDC: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
          nextWETH: "0xA9CB51C666D2AF451d87442Be50747B31BB7d805",
          WETH: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
          nextDAI: "0x86a343BCF17D79C475d300eed35F0145F137D0c9",
          DAI: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
          nextUSDT: "0xD609f26B5547d5E31562B29150769Cb7c774B97a",
          USDT: "0x55d398326f99059fF775485246999027B3197955",
        },
      },

      //Testnet
      goerli: {
        name: "Goerli",
        id: 5,
        domainId: 1735353714,
        connextContract: "0xFCa08024A6D4bCc87275b1E4A1E22B71fAD7f649",
        assets: {
          TEST: "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1",
          WETH: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        },
      },
      optimismGoerli: {
        name: "Optimism-Goerli",
        id: 420,
        domainId: 1735356532,
        connextContract: "0x5Ea1bb242326044699C3d81341c5f535d5Af1504",
        assets: {
          TEST: "0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF",
          nextWETH: "0x39B061B7e41DE8B721f9aEcEB6b3f17ECB7ba63E",
          WETH: "0x74c6FD7D2Bc6a8F0Ebd7D78321A95471b8C2B806",
        },
      },
      mumbai: {
        name: "Mumbai",
        id: 80001,
        domainId: 9991,
        connextContract: "0x2334937846Ab2A3FCE747b32587e1A1A2f6EEC5a",
        assets: {
          TEST: "0xeDb95D8037f769B72AAab41deeC92903A98C9E16",
          nextWETH: "0x1E5341E4b7ed5D0680d9066aac0396F0b1bD1E69",
          WETH: "0xFD2AB41e083c75085807c4A65C0A14FDD93d55A9",
        },
      },
      arbitrumGoerli: {
        name: "Arbitrum-Goerli",
        id: 421613,
        domainId: 1734439522,
        connextContract: "0x2075c9E31f973bb53CAE5BAC36a8eeB4B082ADC2",
        assets: {
          TEST: "0xDC805eAaaBd6F68904cA706C221c72F8a8a68F9f",
          WETH: "0x1346786E6A5e07b90184a1Ba58E55444b99DC4A2",
        },
      },
      zkSyncEraTestnet: {
        name: "zkSync Era Testnet",
        id: 280,
        domainId: 2053862260,
        connextContract: "0xB0694fEcEdd88e5590A563aDb5f194d2dE30F0b6",
        assets: {
          TEST: "0x7c1412e456ad60b8ee458c4eb3a9852c3e389353",
        },
      },
      lineaTestnet: {
        name: "Linea Testnet",
        id: 59140,
        domainId: 1668247156,
        connextContract: "0xfdb6B853C1945Dbffe78A3091BeBB9A928234fA3",
        assets: {
          TEST: "0xB706319D37b945727E71ae0d4353699d19112576",
        },
      },
      polygonZkEvmTestnet: {
        name: "Polygon zkEVM Testnet",
        id: 1442,
        domainId: 1887071092,
        connextContract: "0x20b4789065DE09c71848b9A4FcAABB2c10006FA2",
        assets: {
          TEST: "0x5f921E4DE609472632CEFc72a3846eCcfbed4ed8",
        },
      },
    },
  };
};
