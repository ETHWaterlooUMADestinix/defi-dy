import React, {useState, useEffect} from 'react'
import AssetRowHeader from "../molecules/AssetRowHeader";	
import AssetRow from "../molecules/AssetRow";
import TokenizedDerivative from '../../contracts/TokenizedDerivative'
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import Chart from "react-apexcharts";

let tmp = false

export default function Home(props) {
    const { web3 } = props
    const { toBN } = web3.utils

    const [buyAmount, setBuyAmount] = useState(1)
    // const [cmpData, setCmpData] = useState({borrowers: null, suppliers: null})

    const [chart, setChartOptions]= useState({
        options: {
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Borrowers',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ' ',
                // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    })

    const getGraph = () => {
        const query = `{
                borrowers(first: 20) {
                    id
                    requestId
                    price
                    exchangeVal
                    tokenRatio
                }
                suppliers(first: 20) {
                    id
                    requestId
                    price
                    exchangeVal
                    tokenRatio
                }
            }`
        ;

        const result = async () => await fetch('https://api.thegraph.com/subgraphs/name/sneh1999/deficmp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query
            })
        }).then(res => res.json())
            .then(res => {
                setChartOptions({
                    options: {
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            curve: 'straight'
                        },
                        title: {
                            text: 'Governed by Compound protocol performance',
                            align: 'left'
                        },
                        grid: {
                            row: {
                                colors: ['#f3f3f3', 'transparent'],
                                opacity: 0.5
                            },
                        },
                        xaxis: {
                            categories: ' ',
                            // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                        }
                    },
                    series: [
                        {
                            name: "series-1",
                            data: res.data.borrowers.map(el => (Number(el.exchangeVal)/10**18))
                        }
                    ]
                })
            });

        result()
    }


    if (!tmp) {
        getGraph()
        tmp = true
    }


    const [homeState, setHomeState] = useState({}) 
    const tokenizeDerivativeAddress = "0x6c8cA9170FE3B3bf3BcD50c6ACf254F1Be06b0E1";
    const tokenizedDerivativeContract = new web3.eth.Contract(
        TokenizedDerivative.abi, tokenizeDerivativeAddress
    );

  const buyToken = () => {
        const tokenDecimals = toBN(15);
        const tokenAmountToTransfer = toBN(buyAmount);
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
            <h5 className="text-left mb-3">Token detail</h5>
            <section className="row text-left">
                <div className="col-4">
                    <div className="bg-white rounded p-3 shadow">
                        <div className="font-weight-bold">Asset name</div>
                        <div style={{color: '#FF6895', fontSize: '1.4rem'}}>{homeState.tokenName || 'Not connected to web3 yet'}</div>
                    </div>
                </div>

                <div className="col-4">
                    <div className="bg-white rounded p-3 shadow">
                        <div className="font-weight-bold">Holdings</div>
                        <div style={{color: '#5666F6', fontSize: '1.4rem'}}>{homeState.tokenBalance || 0}</div>
                    </div>
                </div>

                <div className="col-4">
                    <div className="bg-white rounded p-3 shadow">
                        <div className="font-weight-bold">Type</div>
                        <div style={{color: '#6F7174', fontSize: '1.4rem'}}>Future Options (LIVE)</div>
                    </div>
                </div>
            </section>
            <section className="row text-left mt-3">
                <div className="col col-8">
                    <div className="bg-white rounded p-3 shadow">
                        <div className="font-weight-bold mb-3" style={{color: '#5FC5A6', fontSize: '1.4rem'}}>
                            Exchange value of DaiCmp
                        </div>
                        <Chart
                            options={chart.options}
                            series={chart.series}
                            height={300}
                            type="line"/>
                    </div>
                </div>

                <div className="col col-4">
                    <div className="bg-white rounded p-3 shadow">
                        <div className="font-weight-bold">Expiring</div>
                        <div style={{color: '#6F7174', fontSize: '1.4rem'}}>2020 January 1</div>
                    </div>
                    <div className="bg-white rounded p-3 mt-3 shadow">
                      <div className="font-weight-bold mb-3">Actions</div>
                        <input type="number" min="0" className="w-100" onChange={e => setBuyAmount(e.target.value)} placeholder={'mETH'}/>
                      <button style={{ marginBottom: '5px' }} className="mt-3 btn btn-primary btn-block font-weight-bold" onClick={() => buyToken()}>
                          Direct buy
                      </button>
                      <a href="http://localhost:3001/">
                          <button class="btn btn-primary btn-block font-weight-bold">
                              Peer exchange
                          </button>
                      </a>
                    </div>
                </div>
            </section>

            <h5 className="text-left mt-4">Token list</h5>
            <div className="p-3">
                <AssetRowHeader/>
                <AssetRow name="Compound DefiDy" index={1} category="Future Options (LIVE)" locked={homeState.tokenBalance || 0} web3={props.web3}/>
                <AssetRow name="MakerDao Defidy" index={2} category="Coming  Soon" locked="--" web3={props.web3}/>
                <AssetRow name="Aave  Defidy" index={3} category="Coming Soon" locked="--" web3={props.web3}/>
                <AssetRow name="UniswapPools Defidy" index={4} category="Coming Soon" locked="--" web3={props.web3}/>
            </div>
        </main>
    )
}
