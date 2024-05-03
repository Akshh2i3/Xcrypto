'use client'
import React, { useEffect, useState } from 'react'
import Loader from '@/components/Loader';
import ErrorComp from '@/components/ErrorComp';
import axios from 'axios';
import { server } from '@/app/layout';
import { Badge, Box, Button, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText } from '@chakra-ui/react';
import Chart from '@/components/Chart';

const CoinDetails = ({ id }) => {
    const [coin, setCoin] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currency, setCurrency] = useState('inr');
    const [days, setDays] = useState('24h');
    const [chartArray, setChartArray] = useState([]);

    const currencySymbol = (currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$');
    const btns = ['24h', '7d', '14d', '30d', '60d']

    useEffect(() => {
        const fetchCoinDetails = async () => {
            try {
                // console.log(id)
                const { data } = await axios.get(`${server}/coins/${id}`)

                console.log(data)
                setCoin(data)

                // introducing delay for letting data fit int setCoins otherwise it is throwing reading properties of undefined error
                // setTimeout(() => {
                //     setLoading(false)
                // }, 100);
                // bug is not resolved even after doing this

                setLoading(false)
            } catch (error) {
                setError(true)
                setLoading(false)
                // console.log(error)
            }
        }
        fetchCoinDetails();
    }, [id])

    // reduced API calls
    // commented out setLoading from this section as we are making 2 seprate calls and we need the main component to render only when both the response are reached but previously if any of the API response is successful the loading was set to false and the component is rendered with incomplete information which gave us reading properties of undefined error that way we removed setLoading from here 
    useEffect(() => {
        const fetchCoinDetails = async () => {
            try {
                const { data: chartData } = await axios.get(`${server}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
                setChartArray(chartData.prices)
                // setLoading(false)
            } catch (error) {
                setError(true)
                // setLoading(false)
            }
        }
        fetchCoinDetails();
    }, [currency, days])


    const CustomBar = ({ low, high, curr }) => {
        return (
            <div className='flex flex-col w-full items-center gap-2'>
                <Progress value={(curr / (low + high)) * 100} colorScheme={'teal'} w={'full'} />
                <div className='flex justify-between w-full'>
                    <Badge children={low} colorScheme={'red'} fontSize={'xl'} />
                    <p className='text-sm'>24H Range</p>
                    <Badge children={high} colorScheme={'green'} fontSize={'xl'} />
                </div>
            </div>
        )
    }

    const Item = ({ title, value }) => {
        return (
            <div className='flex justify-between'>
                <p >{title}</p>
                <p className='font-bold'>{
                    [null, '₹null', '€null', '$null'].some((i) => i === value)
                        ? 'NA' : value
                }</p>
            </div>
        )
    }

    if (error) return <ErrorComp />
    if (loading) return <Loader />

    return (
        <div className='max-w-4xl min-h-[38vw] mx-auto mt-10 p-5'>
            <RadioGroup value={currency} onChange={(value) => setCurrency(value)}>
                <div className='flex gap-5'>
                    <Radio value={'inr'}>₹ INR</Radio>
                    <Radio value={'eur'}>€ EUR</Radio>
                    <Radio value={'usd'}>$ USD</Radio>
                </div>
            </RadioGroup>
            <div className='w-full min-h-[38vw] border-2 border-black rounded-xl text-3xl px-10 pt-4'>
                <div className='flex flex-row gap-10 items-center justify-between mb-10'>
                    <div>
                        <span className='p-1 mr-2 w-fit bg-black text-white rounded-md text-xl border-2 border-black'># {coin.market_cap_rank}</span>
                        <span className='border-b-2 border-black'>
                            {coin.name}
                        </span>
                    </div>

                    <div className='w-24'>
                        <img src={coin.image.large} alt={coin.name} />
                    </div>

                    <div className='flex flex-col'>
                        <p>{currencySymbol} {coin.market_data.current_price[`${currency}`]}</p>
                        <Stat>
                            <StatHelpText>
                                <StatArrow type={coin.market_data.price_change_percentage_24h >= 0 ? 'increase' : 'decrease'} />
                                {coin.market_data.price_change_percentage_24h} %
                            </StatHelpText>
                        </Stat>
                    </div>

                </div>

                <div className='flex flex-col gap-10 opacity-[0.7] text-sm'>

                    <CustomBar
                        low={coin.market_data.low_24h[currency]}
                        high={coin.market_data.high_24h[currency]}
                        curr={coin.market_data.current_price[`${currency}`]}
                    />

                    <div className='flex flex-col gap-3'>

                        <Item
                            title={'Max Supply'}
                            value={coin.market_data.max_supply}
                        />
                        <Item
                            title={"Circulating Supply"}
                            value={coin.market_data.circulating_supply}
                        />
                        <Item
                            title={"Market Cap"}
                            value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
                        />
                        <Item
                            title={"All Time Low"}
                            value={`${currencySymbol}${coin.market_data.atl[currency]}`}
                        />
                        <Item
                            title={"All Time High"}
                            value={`${currencySymbol}${coin.market_data.ath[currency]}`}
                        />
                    </div>
                </div>

                <div className='flex gap-4 pb-5 pt-10 '>
                    {
                        btns.map((i) =>
                            <Button key={i} onClick={() => setDays(i)}>{i}</Button>
                        )
                    }
                </div>
                <Box width={'full'} borderWidth={1}>
                    <Chart arr={chartArray} currency={currencySymbol} days={days} />
                </Box>
                {/* <p >Last Updated on {Date().split('G')[0]}</p> */}
                <p className='text-sm pt-10 text-right'>Last  Updated on {coin.last_updated.split('T')[0]}</p>
            </div>
        </div>
    )
}

export default CoinDetails