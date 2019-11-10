import React from 'react'	

export default function AssetRowHeader() {	
    return (	
        <div className="row bg-eth rounded text-white font-weight-bold text-left">	
            <div className="col col-1 p-3">	
                Index
            </div>	
            <div className="col col-3 p-3">	
                Name	
            </div>	
            <div className="col col-1 p-3">	
                Category	
            </div>	
            <div className="col col-3 p-3 text-right">	
                Locked	
            </div>	
            <div className="col col-2 p-3 text-right">	
                Expires	
            </div>	
            <div className="col col-2 p-3 text-right">	
                Actions	
            </div>	
        </div>	
    )	
} 