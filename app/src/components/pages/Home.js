import React, {useState, useEffect} from 'react'
import AssetPreview from "../organisms/AssetPreview";
import AssetRowHeader from "../molecules/AssetRowHeader";
import AssetRow from "../molecules/AssetRow";

import { SignerSubprovider, RPCSubprovider, Web3ProviderEngine } from '@0x/subproviders';
import { Web3Wrapper } from '@0x/web3-wrapper';

let tokenAddress = "0x6c8cA9170FE3B3bf3BcD50c6ACf254F1Be06b0E1";
let walletAddress = "0x136F72c1b4F4d8Ed741B332Ea34E9C8633cB8E3F";

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

        // Get ERC20 Token contract instance
        // console.log(props.web3.eth.Contract)
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

        const code = `
            zeroExInstant.render(
                {
                    orderSource: 'https://api.openrelay.xyz/v2/',
                },
                'body',
            );
            `

        const sc = document.createElement("script");

        sc.src = "https://instant.0xproject.com/instant.js";
        sc.async = true;

        document.body.appendChild(sc);

        // const script = document.createElement("script");
        // script.text = code;
        // script.async = true;
        // document.body.appendChild(script);
    })

    function sellTest() {
        if (!window.provider) {
            const providerEngine = new Web3ProviderEngine();
            providerEngine.addProvider(new SignerSubprovider(props.web3.currentProvider));
            providerEngine.start();
            window.provider = providerEngine
        }

        const code = `
            const erc20TokenAddress = '${tokenAddress}';
            const erc20TokenAssetData = zeroExInstant.assetDataForERC20TokenAddress(erc20TokenAddress);
        
            zeroExInstant.render(
                {
                    orderSource: 'https://sra.bamboorelay.com/0x/v2/',
                    provider: window.provider,
                    networkId: 4, // Rinkeby network ID
                    // defaultSelectedAssetData: erc20TokenAddress,
                    additionalAssetMetaDataMap: {
                        [erc20TokenAssetData]: {
                            assetProxyId: zeroExInstant.ERC20_PROXY_ID,
                            decimals: 18,
                            symbol: 'dedy',
                            name: 'Defi dy',
                            // primaryColor: '#F2F7FF', // Optional
                        },
                    }
                },
                'body',
            );
            `
        const script = document.createElement("script");
        script.text = code;
        script.async = true;
        document.body.appendChild(script);
    }

    return (
        <main className="container">
            <AssetPreview totalLockedValue="$648.9M" dominancePercent="34%"/>
            <div className="mt-4 px-3">
                <AssetRowHeader/>
                <AssetRow name="DEDY - Defi dy" index={1} category="Future" locked="100k" web3={props.web3}/>
            </div>
            <div id="zeroExInstantContainer"></div>
            <a href="http://localhost:3001/">
                <button class="btn-primary">
                    Exchange your tokens
                </button>
            </a>
        </main>
    )
}