require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { task } = require("hardhat/config");

// Tarea personalizada para listar cuentas
task("accounts", "Muestra las cuentas disponibles", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
    },
  },
};
