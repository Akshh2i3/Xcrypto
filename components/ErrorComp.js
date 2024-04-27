import React from 'react'

const ErrorComp = () => {
    return (
        <div className='h-[85vh] flex flex-col gap-5 justify-center items-center text-3xl font-semibold bg-zinc-400'>
            <p>Max API Call Limit Reached</p>
            <p>Please wait for a while and refresh</p>
            <p>Thank You for your patience</p>
        </div>
    )
}

export default ErrorComp