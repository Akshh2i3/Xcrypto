import React from 'react'
import Message from '@/components/Message'
import CoinDetails from '../../CoinDetails/page'

const idPage = ({ params }) => {
    return (
        <div>
            {/* <Message msg={params.id} /> */}
            <CoinDetails id={params.id} />
        </div>
    )
}

export default idPage