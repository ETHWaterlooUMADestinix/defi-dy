import React from 'react'

export default function AssetRowHeader() {
    return (
        <div className="row bg-eth rounded text-white font-weight-bold text-left">
            <div className="col col-1 p-3">
                Number
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
                1 Day %
            </div>
            <div className="col col-2 p-3 text-right">
                Actions
            </div>
        </div>
    )
}