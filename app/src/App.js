import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

// import * as Fortmatic from 'fortmatic'
// import * as Web3 from 'web3'

import TheHeader from "./components/organisms/TheHeader";
import Home from './components/pages/Home';

function App() {
    // const fm = new Fortmatic('pk_test_7416A3AF50E1CF5E');
    // const web3 = new Web3(fm.getProvider());
    //
    // web3.eth.sendTransaction({
        // from: '0x0000000000000000000000000000000000000000',
        // to: '0x136F72c1b4F4d8Ed741B332Ea34E9C8633cB8E3F',
        // value: 2
    // });

  return (
    <div className="App">
        <div class="mb-3">
            <TheHeader/>
        </div>
        <Router>
            <Switch path="/">
                <Home/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
