
const hre = require("hardhat");

async function main() {

  const transactions = await hre.ethers.deployContract("Transactions");
  console.log('deploying......');
  await transactions.waitForDeployment();
  console.log(await transactions.getAddress());
  
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
