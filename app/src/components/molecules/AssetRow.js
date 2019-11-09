import React from 'react'

export default function AssetRow(props) {
    function buyToken() {
        const tokenDecimals = props.web3.utils.toBN(17);
        const tokenAmountToTransfer = props.web3.utils.toBN(1);
        const calculatedTransferValue = props.web3.utils.toHex(tokenAmountToTransfer.mul(props.web3.utils.toBN(10).pow(tokenDecimals)));

        props.web3.eth.sendTransaction({
            from: '0x0000000000000000000000000000000000000000',
            to: '0x78aC6DCFD5Ba5C674C42c9642d87393Ab41bd6ab',
            value: calculatedTransferValue
        });
    }

    return (
        <div className="row bg-white text-left">
            <div className="col col-1 p-3">
                {props.index}
            </div>
            <div className="col col-3 p-3">
                {props.name}
            </div>
            <div className="col col-1 p-3">
                {props.category}
            </div>
            <div className="col col-3 p-3  text-right">
                {props.locked}
            </div>
            <div className="col col-2 p-3 text-right">
                {(props.variation || 0) * 100} %
            </div>
            <div className="col col-2 p-3 d-flex justify-content-end align-items-end">
                <button className="p-2 btn-primary" onClick={() => buyToken(props.index)}>
                    Buy
                </button>
                {/*<button className="p-2 btn-warning">*/}
                {/*    Sell*/}
                {/*</button>*/}
            </div>
        </div>
    )
}