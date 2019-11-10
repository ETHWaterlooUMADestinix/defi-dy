import React from 'react'

export default function TheHeader() {
    return (
        <header className="container text-left">
           <div align="center" className="d-flex align-items-center justify-content-center">
                 <img src="/icon.png" height={40} class="my-3 mr-3"/>
                 <img src="/logo.png" width={150} height={60} class="my-3"/>
            </div>
            <div className="rounded text-white overflow-hidden d-flex align-items-center" style={{background: '#1b2638', height: '300px'}}>
                <div className="p-5">
                    <h1 className="ml-5" style={{flex:1, 'font-size': '2rem'}}>
                    Invest in companies, not speculation
                    </h1>
                    <div className="ml-5" style={{flex:1, 'font-size': '1rem'}}>
                        The first asset based on real performances of a protocol
                    </div>
                </div>

                <img src="/pluto.png" style={{width: '550px', 'margin-right': '-100px', 'margin-top': '14px'}}/>
            </div>
        </header>
    )
}
