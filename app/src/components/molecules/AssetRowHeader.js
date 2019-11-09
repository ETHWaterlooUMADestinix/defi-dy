import React from 'react'

export default function AssetRowHeader() {
    return (
        <div class="row bg-eth rounded text-white font-weight-bold">
            <div class="col col-1 p-3">
                Number
            </div>
            <div className="col col-1 p-3">
                Name
            </div>
            <div className="col col-1 p-3">
                Category
            </div>
            <div className="col col-1 p-3">
                Locked
            </div>
            <div className="col col-1 p-3">
                1 Day %
            </div>
        </div>
    )
}