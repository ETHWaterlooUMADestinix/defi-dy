const argv = require("minimist")(process.argv.slice(), { string: ["sender", "receiver"] });
const TestnetERC20 = artifacts.require("TestnetERC20");
const MAX_UINT_VAL = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

const approveTestnetERC20 = async function(callback) {
  try {
    const testnetERC20 = await TestnetERC20.deployed()

    await testnetERC20.approve(argv.receiver, MAX_UINT_VAL, { from: argv.sender })

    console.log(`Allocated!`)
  } catch (e) {
    console.log(`Error: ${e.toString()}`)
  }
  callback();
};

module.exports = approveTestnetERC20;
