const argv = require("minimist")(process.argv.slice(), { string: ["tokenAddress", "price"] }); 
const { interfaceName } = require("../utils/Constants.js");

const TokenSale = artifacts.require("TokenSale");

const deployTokenSale = async function(callback) {
  try {
    const priceWei = web3.utils.toWei(argv.price.toString());

    const tokenSale = await TokenSale.deploy(
      argv.tokenAddress,
      argv.priceWei
    )

    console.log(`TokenSale address: ${tokenSale.address}`) 
  } catch (e) {
    console.log(`Error: ${e}`)
  }

  callback()
}

module.exports = deployTokenSale;
