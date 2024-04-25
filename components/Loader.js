import React from 'react'
import Message from './Message'
import { Box, Spinner } from '@chakra-ui/react'

const Loader = () => {
    return (
        <div className='h-[86vh] flex items-center justify-center'>
            <Box transform={'scale(3)'}>
                <Spinner size={'xl'} />
            </Box>
        </div>
    )
}

export default Loader