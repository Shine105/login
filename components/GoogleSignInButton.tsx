import React, { FC, ReactNode } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils' // if you're using the cn utility (optional)

interface GoogleSignInButtonProps extends React.ComponentProps<typeof Button> {
  children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children, className, ...props }) => {
  const loginWithGoogle = () => console.log('login with google');

  return (
    <Button
      className={cn('w-full', className)} // merge your default and incoming styles
      onClick={loginWithGoogle}
      {...props}
    >
      {children}
    </Button>
  )
}

export default GoogleSignInButton
