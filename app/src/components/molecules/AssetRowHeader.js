import React from 'react'

export default function AssetRowHeader() {
    return (
        <div class="row bg-dark rounded">
            <div class="col col-1">
                Number
            </div>
            <div className="col col-1">
                Name
            </div>
            <div className="col col-1">
                Category
            </div>
            <div className="col col-1">
                Locked
            </div>
            <div className="col col-1">
                1 Day %
            </div>
        </div>
    )
}