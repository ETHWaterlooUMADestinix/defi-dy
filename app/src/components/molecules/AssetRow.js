import React from 'react'

export default function AssetRow(props) {
    return (
        <div class="row bg-white">
            <div class="col col-1">
                {props.index}
            </div>
            <div className="col col-1">
                {props.name}
            </div>
            <div className="col col-1">
                {props.category}
            </div>
            <div className="col col-1">
                {props.lockedAmount}
            </div>
            <div className="col col-1">
                {props.variation}
            </div>
        </div>
    )
}