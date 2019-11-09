import React from 'react'
import AssetPreview from "../organisms/AssetPreview";
import AssetRowHeader from "../molecules/AssetRowHeader";
import AssetRow from "../molecules/AssetRow";

export default function Home() {
    return (
        <main class="container">
            <AssetPreview totalLockedValue="$648.9M" dominancePercent="34%"/>
            <div class="mt-4 px-3">
                <AssetRowHeader/>
                <AssetRow name="name"/>
            </div>
        </main>
    )
}