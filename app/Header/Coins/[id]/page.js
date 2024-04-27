import React from 'react'
import CoinDetails from '../../CoinDetails/page'

const idPage = ({ params }) => {
    return (
        <div>
            <CoinDetails id={params.id} />
        </div>
    )
}

export default idPage