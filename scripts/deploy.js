const hre = require("hardhat");

async function main() {
  const PayOrder = await hre.ethers.getContractFactory("PayOrder");
  const payOrder = await PayOrder.deploy();

  await payOrder.deployed();

  console.log("PayOrder deployed to:", payOrder.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
