import { Web3Wrapper } from '@0x/web3-wrapper';
import * as Fortmatic from 'fortmatic'
import * as Web3 from 'web3'

import { sleep } from '../util/sleep';

let web3Wrapper: Web3Wrapper | null = null;

export const isMetamaskInstalled = (): boolean => {
    const { ethereum, web3 } = window;
    return ethereum || web3;
};

export const initializeWeb3Wrapper = async (): Promise<Web3Wrapper | null> => {
    const { ethereum, location } = window;

    if (web3Wrapper) {
        return web3Wrapper;
    }

    const fm = new Fortmatic('pk_test_7416A3AF50E1CF5E', 'ropsten');
    const web3 = new Web3(fm.getProvider());
    web3Wrapper = new Web3Wrapper(web3.currentProvider);
    return web3Wrapper;

    if (ethereum) {
        try {
            web3Wrapper = new Web3Wrapper(ethereum);
            // Request account access if needed
            await ethereum.enable();

            // Subscriptions register
            ethereum.on('accountsChanged', async (accounts: []) => {
                // Reload to avoid MetaMask bug: "MetaMask - RPC Error: Internal JSON-RPC"
                location.reload();
            });
            ethereum.on('networkChanged', async (network: number) => {
                location.reload();
            });

            return web3Wrapper;
        } catch (error) {
            // The user denied account access
            return null;
        }
    } else if (web3) {
        web3Wrapper = new Web3Wrapper(web3.currentProvider);
        return web3Wrapper;
    } else {
        //  The user does not have metamask installed
        return null;
    }
};

export const getWeb3Wrapper = async (): Promise<Web3Wrapper> => {
    while (!web3Wrapper) {
        // if web3Wrapper is not set yet, wait and retry
        await sleep(100);
    }

    return web3Wrapper;
};
