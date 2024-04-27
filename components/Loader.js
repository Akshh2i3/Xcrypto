import React from 'react'
import Message from './ErrorComp'
import { Box, Spinner } from '@chakra-ui/react'

const Loader = () => {
    return (
        <div className='h-[84vh] flex items-center justify-center'>
            <Box transform={'scale(3)'}>
                <Spinner size={'xl'} />
            </Box>
        </div>
    )
}

export default Loader