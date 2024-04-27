'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '@/app/layout'
import ExchangeCard from '@/components/ExchangeCard'
import ErrorComp from '@/components/ErrorComp'
import Loader from '@/components/Loader'


const Exchanges = () => {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const { data } = await axios.get(`${server}/exchanges`)
                // console.log(data)
                setExchanges(data)
                setLoading(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }
        fetchExchanges();
    }, [])

    if (error) return <ErrorComp />

    return (
        <div>
            {loading
                ? <Loader />
                : <div className='p-10 flex justify-center flex-wrap gap-14'>
                    {exchanges.map((obj) => <ExchangeCard key={obj.id} obj={obj} />)}
                </div>}
        </div>
    )
}

export default Exchanges