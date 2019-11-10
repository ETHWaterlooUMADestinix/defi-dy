const TokenSale = artifacts.require("TokenSale");

module.exports = async (deployer) => {
  await deployer.deploy(TokenSale, 
    '201', // 1 ETH => 214 Token
    '0x12A4f6Ee4CCbD1d0031297293ba9dc26A3Ec3999',
    '0x6c8cA9170FE3B3bf3BcD50c6ACf254F1Be06b0E1'
  );

  const tokenSale = await TokenSale.deployed()

  console.log(`Tokensale Address: ${tokenSale.address}`)
};
