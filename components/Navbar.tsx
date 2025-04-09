import { buttonVariants } from '@/components/ui/button'
import { HandMetal, HandMetalIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
      <div className='mx-auto px-4 flex items-center justify-between'>
        <Link href='/'><HandMetal /></Link>
        <Link className={buttonVariants()} href='/sign-in'>Sign in</Link>
      </div>
    </div>
  )
}

export default Navbar
