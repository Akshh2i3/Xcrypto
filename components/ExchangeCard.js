import React from 'react'

const ExchangeCard = ({ obj }) => {
    const { name, image, trust_score_rank, url } = obj;
    return (
        <div className='pt-3 font-semibold h-[160px] w-[150px] border-2 border-slate-400 rounded-md shadow-xl hover:scale-[1.1] transition-all'>
            <a href={url} target='_blank' className='flex flex-col items-center gap-2 '>
                <img src={image} alt={name} width={50} ></img>
                <p>{trust_score_rank}</p>
                <p className='text-center'>{name}</p>
            </a>
        </div>
    )
}

export default ExchangeCard