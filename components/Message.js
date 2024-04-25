import React from 'react'

const Message = ({ msg }) => {
    return (
        <div className='h-screen flex justify-center items-center text-3xl font-bold'>
            {msg}
        </div>
    )
}

export default Message