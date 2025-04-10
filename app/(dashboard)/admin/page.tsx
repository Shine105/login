import Navbar from '@/components/Navbar';
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session?.user) {
    return (
      <div>
      <Navbar />
    <h2 className='text-2xl mt-50 flex justify-center items-centerl'>
      Admin page - Welcome back {session?.user.username}
    </h2>
    </div>
    )
  }


  return <h2 className='text-2xl mt-50 flex flex-col justify-center items-center'> Please login to see this admin page</h2>
  
}

export default page
