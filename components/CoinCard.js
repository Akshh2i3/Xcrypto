import React from 'react'
import Link from 'next/link';

const CoinCard = ({ obj, currencySymbol }) => {
    const { id, name, image, symbol, current_price } = obj;
    return (
        < div className='pt-3 px-2 font-semibold min-h-[10vw] min-w-[10vw] border-2 border-slate-400 rounded-md shadow-xl hover:scale-[1.1] transition-all' >
            <Link href={`/Header/Coins/${id}`} className='flex flex-col items-center gap-2 '>
                <img src={image} alt={name} width={50} ></img>
                <p>{symbol}</p>
                <p className='text-center'>{currencySymbol} {current_price}</p>
            </Link>
        </div >
    )
}

export default CoinCard 