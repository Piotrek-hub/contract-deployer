import { ethers } from "hardhat";

async function main() {
  const DeployerFactory = await ethers.getContractFactory("Deployer");
  const deployer = await DeployerFactory.deploy();

  await deployer.deployed();

  console.log(
    `Deployer deployed to: ${deployer.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
