export const WethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

export const depositCalldata =
  "0x095ea7b3000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000002540be400";

export const WethAbi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "guy", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "src", type: "address" },
      { name: "dst", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "wad", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "dst", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "deposit",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  { payable: true, stateMutability: "payable", type: "fallback" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "src", type: "address" },
      { indexed: true, name: "guy", type: "address" },
      { indexed: false, name: "wad", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "src", type: "address" },
      { indexed: true, name: "dst", type: "address" },
      { indexed: false, name: "wad", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "dst", type: "address" },
      { indexed: false, name: "wad", type: "uint256" },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "src", type: "address" },
      { indexed: false, name: "wad", type: "uint256" },
    ],
    name: "Withdrawal",
    type: "event",
  },
];

export const WethAbiFromSafe =
  '[{"name":"name","type":"function","inputs":[],"outputs":[{"name":"","type":"string"}],"payable":false,"constant":true,"stateMutability":"view"},{"name":"approve","type":"function","inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"payable":false,"constant":false,"stateMutability":"nonpayable"},{"name":"totalSupply","type":"function","inputs":[],"outputs":[{"name":"","type":"uint256"}],"payable":false,"constant":true,"stateMutability":"view"},{"name":"transferFrom","type":"function","inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"payable":false,"constant":false,"stateMutability":"nonpayable"},{"name":"withdraw","type":"function","inputs":[{"name":"wad","type":"uint256"}],"outputs":[],"payable":false,"constant":false,"stateMutability":"nonpayable"},{"name":"decimals","type":"function","inputs":[],"outputs":[{"name":"","type":"uint8"}],"payable":false,"constant":true,"stateMutability":"view"},{"name":"balanceOf","type":"function","inputs":[{"name":"","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"payable":false,"constant":true,"stateMutability":"view"},{"name":"symbol","type":"function","inputs":[],"outputs":[{"name":"","type":"string"}],"payable":false,"constant":true,"stateMutability":"view"},{"name":"transfer","type":"function","inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"payable":false,"constant":false,"stateMutability":"nonpayable"},{"name":"deposit","type":"function","inputs":[],"outputs":[],"payable":true,"constant":false,"stateMutability":"payable"},{"name":"allowance","type":"function","inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"payable":false,"constant":true,"stateMutability":"view"},{"type":"fallback","payable":true,"stateMutability":"payable"},{"name":"Approval","type":"event","inputs":[{"name":"src","type":"address","indexed":true},{"name":"guy","type":"address","indexed":true},{"name":"wad","type":"uint256","indexed":false}],"anonymous":false},{"name":"Transfer","type":"event","inputs":[{"name":"src","type":"address","indexed":true},{"name":"dst","type":"address","indexed":true},{"name":"wad","type":"uint256","indexed":false}],"anonymous":false},{"name":"Deposit","type":"event","inputs":[{"name":"dst","type":"address","indexed":true},{"name":"wad","type":"uint256","indexed":false}],"anonymous":false},{"name":"Withdrawal","type":"event","inputs":[{"name":"src","type":"address","indexed":true},{"name":"wad","type":"uint256","indexed":false}],"anonymous":false}]';
