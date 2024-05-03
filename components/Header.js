'use client'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='h-20 bg-black border-b-2 border-white flex gap-10 px-10 py-5'>
      <Button>
        <Link href='/'>Home</Link>
      </Button>
      <Button>
        <Link href='/Coins'>Coins</Link>
      </Button>
      <Button>
        <Link href='/Exchanges'>Exchanges</Link>
      </Button>
    </div>
  )
}

export default Header