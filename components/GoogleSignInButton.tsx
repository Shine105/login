import React, { FC, ReactNode } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'

interface GoogleSignInButtonProps extends React.ComponentProps<typeof Button> {
  children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children, className, ...props }) => {
  const loginWithGoogle = () => signIn('google', { callbackUrl: 'http://localhost:3000/admin' })
  return (
    <Button
      className={cn('w-full', className)}
      onClick={loginWithGoogle}
      {...props}>

      {children}

    </Button>
  )
}

export default GoogleSignInButton
