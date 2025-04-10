import { buttonVariants } from '@/components/ui/button'
import { HandMetal } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import UserAccountnav from './UserAccountnav'

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  
  return (
    <div className='bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full  z-10 top-0'>
      <div className='mx-auto px-4 flex items-center justify-between'>
        <Link href='/'><HandMetal /></Link>
        {session?.user ?(
          <UserAccountnav /> 
        ):(
          <Link className={buttonVariants()} href='/sign-in'>
            Sign in
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
