require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337
    },
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        `8f52c329d461cf558f590a7cc6b5539f6bf080ac0d42288637034aecd0c5da56`,
        `7ef06a606daa8c57f3ed469287d17cbb81fe330e13017fce91d6d9a0a055bb84`

      ]
    }

  },
  paths: {
    artifacts: "./src/artifacts",
  }
};

