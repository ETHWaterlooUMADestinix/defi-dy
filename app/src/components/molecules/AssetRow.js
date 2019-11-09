import React from 'react'

export default function AssetRow(props) {
    function buyToken() {
        props.web3.eth.sendTransaction({
            from: '0x0000000000000000000000000000000000000000',
            to: '0x136F72c1b4F4d8Ed741B332Ea34E9C8633cB8E3F',
            value: 2
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