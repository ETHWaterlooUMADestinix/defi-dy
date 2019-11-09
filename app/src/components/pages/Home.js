import React, {useState, useEffect} from 'react'
import AssetPreview from "../organisms/AssetPreview";
import AssetRowHeader from "../molecules/AssetRowHeader";
import AssetRow from "../molecules/AssetRow";

export default function Home(props) {
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        let minABI = [
            // balanceOf
            {
                "constant":true,
                "inputs":[{"name":"_owner","type":"address"}],
                "name":"balanceOf",
                "outputs":[{"name":"balance","type":"uint256"}],
                "type":"function"
            },
            // decimals
            {
                "constant":true,
                "inputs":[],
                "name":"decimals",
                "outputs":[{"name":"","type":"uint8"}],
                "type":"function"
            }
        ];
        let tokenAddress = "0x136F72c1b4F4d8Ed741B332Ea34E9C8633cB8E3F";
        let walletAddress = "0x136F72c1b4F4d8Ed741B332Ea34E9C8633cB8E3F";

        // Get ERC20 Token contract instance
        console.log(props.web3.eth.Contract)
        let MyContract = new props.web3.eth.Contract(minABI, tokenAddress);

        MyContract.methods.balanceOf(walletAddress).call()
            .then(function(result){
                //the result holds your Token Balance that you can assign to a var
                console.log(result)
                return result;
            });

        // Call balanceOf function
        // contract.balanceOf(walletAddress, (error, balance) => {
        //     // Get decimals
        //     contract.decimals((error, decimals) => {
        //         // calculate a balance
        //         balance = balance.div(10**decimals);
        //         console.log(balance.toString());
        //     });
        // });
    })

    return (
        <main className="container">
            <AssetPreview totalLockedValue="$648.9M" dominancePercent="34%"/>
            <div className="mt-4 px-3">
                <AssetRowHeader/>
                <AssetRow name="name" index={1} category="Cat" locked={42} web3={props.web3}/>
            </div>
        </main>
    )
}