require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

module.exports = {
  defaultNetwork: "sepolia",
  solidity:{
    compilers: [
      {
        version: "0.6.0",
        settings: {}
      },
      {
        version: "0.8.19",
        settings : {}
      },
      
    ]
  },
   
  networks : {
    hardhat: {},
    sepolia: {
      url: process.env.RPC_URL,
      accounts: [ process.env.PRIVATE_KEY],
      chainId: 11155111
    }

  }, 
 
};
