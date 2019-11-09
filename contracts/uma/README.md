# Defi-dy
Note: This token was built using the [UMA Protocol](https://github.com/UMAprotocol/protocol)

# Deployment steps
```bash
# In another terminal, run
npx ganache-cli -p 9545 -m helloworld -f https://rinkeby.infura.io/v3/9317010b1b6343558b7eff9d25934f38 -i 11

yarn install

# Deploy contracts and authenticate identifier
cd core/
npx truffle migration --network test
# Note: below depends on what your config/identifiers.json looks like
npx truffle exec scripts/ManualPublishPriceFeed.js --identifier <identity> --price <price> --time <timestamp>

# Deploy Margin Token
cd <root-dir>/sponsor-dapp-v2
yarn install
yarn start
# Now navigate to localhost:3000, get some testnet DAI faucet, and get some ERC-20 tokens as collateral
```
