import React from 'react'	

export default function AssetRow(props) {	
    function buyToken() {	
        const tokenDecimals = props.web3.utils.toBN(17);	
        const tokenAmountToTransfer = props.web3.utils.toBN(1);	
        const calculatedTransferValue = props.web3.utils.toHex(tokenAmountToTransfer.mul(props.web3.utils.toBN(10).pow(tokenDecimals)));	

        props.web3.eth.sendTransaction({	
            from: '0x0000000000000000000000000000000000000000',	
            to: '0x5C7ee826353AfedBfD22853Af2118D42295c7c4f',	
            value: calculatedTransferValue	
        });	
    }	

    return (	
        <div className="row bg-white text-left shadow">
            <div className="col col-1 p-3 font-weight-bold text-center">
                {props.index}	
            </div>	
            <div className="col col-3 p-3">	
                {props.name}	
            </div>	
            <div className="col col-3 p-3">
                {props.category}	
            </div>	
            <div className="col col-1 p-3  text-right">
                {props.locked}	
            </div>	
            <div className="col col-2 p-3 text-right text-warning">
                31 days
            </div>	
            <div className="col col-2 d-flex justify-content-end align-items-center">
                <button className="p-2 btn-secondary rounded text-white px-4" style={{fontSize: '0.9rem'}}>
                   Select
                </button>	
                {/*<button className="p-2 btn-warning">*/}	
                {/*    Sell*/}	
                {/*</button>*/}	
            </div>	
        </div>	
    )	
} 