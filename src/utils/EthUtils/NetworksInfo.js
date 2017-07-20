const ETHEREUM_NETWORK_INFO = [
  {
    networkId:                  1,
    networkName:                "Main Ethereum",
    etherscanTxUrlBuilder:      (txHash) => {return 'https://etherscan.io/tx/' + txHash},
    etherscanAddressUrlBuilder: (addressHash) => {return 'https://etherscan.io/address/' + addressHash},
  },
  {
    networkId:                  2,
    networkName:                "Morden",
    etherscanTxUrlBuilder:      () => {return null},
    etherscanAddressUrlBuilder: () => {return null},
  },
  {
    networkId:                  3,
    networkName:                "Ropsten",
    etherscanTxUrlBuilder:      (txHash) => {return 'https://ropsten.etherscan.io/tx/' + txHash},
    etherscanAddressUrlBuilder: (addressHash) => {return 'https://ropsten.etherscan.io/address/' + addressHash},
  },
  {
    networkId:                  4,
    networkName:                "Rinkeby",
    etherscanTxUrlBuilder:      (txHash) => {return 'https://rinkeby.etherscan.io/tx/' + txHash},
    etherscanAddressUrlBuilder: (addressHash) => {return 'https://rinkeby.etherscan.io/address/' + addressHash},
  },
  {
    networkId:                  42,
    networkName:                "Kovan",
    etherscanTxUrlBuilder:      (txHash) => {return 'https://kovan.etherscan.io/tx/' + txHash},
    etherscanAddressUrlBuilder: (addressHash) => {return 'https://kovan.etherscan.io/address/' + addressHash},
  },
  {
    networkId:                  100,
    networkName:                "Private test network",
    etherscanTxUrlBuilder:      () => {return null},
    etherscanAddressUrlBuilder: () => {return null},
  },
];

export default ETHEREUM_NETWORK_INFO;
