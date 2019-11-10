import React, {useState, useEffect} from 'react'
import AssetRowHeader from "../molecules/AssetRowHeader";	
import AssetRow from "../molecules/AssetRow";
import TokenizedDerivative from '../../contracts/TokenizedDerivative'
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';


export default function Home(props) {
    const { web3 } = props
    const { toBN } = web3.utils

    const [homeState, setHomeState] = useState({}) 
    const tokenizeDerivativeAddress = "0x6c8cA9170FE3B3bf3BcD50c6ACf254F1Be06b0E1";
    const tokenizedDerivativeContract = new web3.eth.Contract(
        TokenizedDerivative.abi, tokenizeDerivativeAddress
    );

  const buyToken = () => {
        const tokenDecimals = toBN(17);
        const tokenAmountToTransfer = toBN(1);
        const calculatedTransferValue = web3.utils.toHex(tokenAmountToTransfer.mul(web3.utils.toBN(10).pow(tokenDecimals)));

        web3.eth.sendTransaction({
            from: '0x0000000000000000000000000000000000000000',
            to: '0x5C7ee826353AfedBfD22853Af2118D42295c7c4f',
            value: calculatedTransferValue
        });
    }

    useEffect(() => {
      const m = async () => {
          // From Wei
          const fromWei = x => web3.utils.fromWei(x, 'ether')

          // Get accounts
          const accounts = await web3.eth.getAccounts()
          const selectedAddress = accounts[0]
          const tokenBalance = await tokenizedDerivativeContract.methods.balanceOf(selectedAddress).call()

          // Calculate 
          const tokenName = await tokenizedDerivativeContract.methods.name().call()
          const totalSupply = await tokenizedDerivativeContract.methods.totalSupply().call()
          const yourSupply = await tokenizedDerivativeContract.methods.balanceOf(selectedAddress).call()

          setHomeState({
            tokenBalance: fromWei(tokenBalance, 'ether'),
            tokenName,
            totalSupply: fromWei(totalSupply, 'ether'),
            holdingSupply: fromWei(yourSupply, 'ether')
          })
      }

      m()
    })


    return (
        <main className="container">
            <section className="row text-left">
                <div className="col col-4">
                    <div className="bg-white rounded p-3 shadow">
                        <div className="font-weight-bold">Name</div>
                        <div style={{color: '#FF6895', fontSize: '1.4rem'}}>{homeState.tokenName || 'Loading'}</div>
                    </div>
                    <div className="bg-white rounded p-3 mt-3 shadow">
                        <div className="font-weight-bold">Holdings</div>
                        <div style={{color: '#5666F6', fontSize: '1.4rem'}}>{homeState.tokenBalance || 0}</div>
                    </div>
                    <div className="bg-white rounded p-3 mt-3 shadow">
                        <div className="font-weight-bold">Type</div>
                        <div style={{color: '#6F7174', fontSize: '1.4rem'}}>Futures</div>
                    </div>
                    <div className="bg-white rounded p-3 mt-3 shadow">
                        <div className="font-weight-bold">Expiries</div>
                        <div style={{color: '#6F7174', fontSize: '1.4rem'}}>2020 January 1</div>
                    </div>
                    <div className="bg-white rounded p-3 mt-3 shadow">
                      <div className="font-weight-bold">Actions</div>
                      <button style={{ marginBottom: '5px' }} className="btn btn-primary btn-block" onClick={() => buyToken()}>
                          Buy
                      </button>
                      <a href="http://localhost:3001/">
                          <button class="btn btn-primary btn-block">
                              Exchange
                          </button>
                      </a>
                    </div>
                </div>
                <div className="col col-8">
                    <div className="bg-white rounded p-3 shadow">
                        <div className="font-weight-bold" style={{color: '#5FC5A6', fontSize: '1.4rem'}}>
                          Compound Finance Network Activity
                        </div>
                        <VictoryChart
                            theme={VictoryTheme.material}
                            height={247}
                        >
                            <VictoryLine
                                style={{
                                    // data: { stroke: "#c43a31" },
                                    // parent: { border: "1px solid #ccc"}
                                }}
                                data={[
                                    { x: 1, y: 2 },
                                    { x: 2, y: 3 },
                                    { x: 3, y: 5 },
                                    { x: 4, y: 4 },
                                    { x: 5, y: 7 }
                                ]}
                            />
                        </VictoryChart>
                    </div>
                </div>
            </section>
            <AssetRowHeader/>	                
            <AssetRow name="Compound DefiDy" index={1} category="Future Options (LIVE)" locked={homeState.tokenBalance || 0} web3={props.web3}/>
            <AssetRow name="MakerDao Defidy" index={2} category="Coming  Soon" locked="--" web3={props.web3}/>
            <AssetRow name="Aave  Defidy" index={3} category="Coming Soon" locked="--" web3={props.web3}/>
            <AssetRow name="UniswapPools Defidy" index={4} category="Coming Soon" locked="--" web3={props.web3}/>
        </main>
    )
}
