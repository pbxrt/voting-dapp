const hre = require("hardhat");

async function main() {
  const ContractFactory = await hre.ethers.getContractFactory("Voting");
  const contractFactory = await ContractFactory.deploy();

  await contractFactory.waitForDeployment();

  const addr = await contractFactory.getAddress();

  console.log("CONTRACT_ADDRESS: ", addr);
}

//npx hardhat run scripts/deploy.js --network polygon_amoy
//npx hardhat run scripts/deploy.js --network localhost

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
