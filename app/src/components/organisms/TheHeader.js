import React from 'react'

export default function TheHeader() {
    return (
        <header className="container text-left">
           <div align="center">
                 <img src="/logo.png" width={150} height={60} class="my-3"/>
            </div>
            <div className="rounded text-white overflow-hidden d-flex align-items-center pl-5" style={{background: '#1b2638', height: '400px'}}>
                <div>
                    <h1 className="ml-5" style={{flex:1, 'font-size': '2rem'}}>
                    Invest in companies, not speculate
                    </h1>
                </div>
                <div className="ml-5" style={{flex:1, 'font-size': '0.5rem'}}>
                  Based on real time performace of protocols
                </div>
                <img src="/pluto.png" style={{width: '550px', 'margin-right': '-100px', 'margin-top': '14px'}}/>
            </div>
        </header>
    )
}
