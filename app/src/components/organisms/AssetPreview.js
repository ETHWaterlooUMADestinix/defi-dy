import React from 'react'
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';

export default function AssetPreview(props) {
    return (
        <section class="row text-left">
            <div class="col col-4">
                <div className="bg-white rounded p-3 shadow">
                    <div class="font-weight-bold">Total value locked</div>
                    <div style={{color: '#FF6895', fontSize: '2.4rem'}}>{props.totalLockedValue}</div>
                </div>
                <div className="bg-white rounded p-3 mt-3 shadow">
                    <div class="font-weight-bold">X dominance</div>
                    <div style={{color: '#5666F6', fontSize: '2.4rem'}}>{props.dominancePercent}</div>
                </div>
            </div>
            <div className="col col-8">
                <div class="bg-white rounded p-3 shadow">
                    <div class="font-weight-bold" style={{color: '#5FC5A6'}}>Total value locked in DeFi</div>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        height={200}
                    >
                        <VictoryLine
                            style={{
                                data: { stroke: "#c43a31" },
                                parent: { border: "1px solid #ccc"}
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
    )
}