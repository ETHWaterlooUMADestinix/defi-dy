import React from 'react';
import logo from './logo.svg';
import './App.scss';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import * as Fortmatic from 'fortmatic'
import * as Web3 from 'web3'

import TheHeader from "./components/organisms/TheHeader";
import Home from './components/pages/Home';

function App() {
    const fm = new Fortmatic('pk_test_7416A3AF50E1CF5E', 'ropsten');
    const web3 = new Web3(fm.getProvider());

  return (
    <div className="App">
        <div className="mb-3">
            <TheHeader/>
        </div>
        <Router>
            <Switch path="/">
                <Home web3={web3}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
