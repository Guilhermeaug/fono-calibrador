'use client'

import { signOut } from 'next-auth/react'
import * as React from 'react'
import { ColorRing } from 'react-loader-spinner'
import { toast } from 'sonner'

type Props = {}

export default function SignOutPage({}: Props) {
  React.useEffect(() => {
    const run = async () => {
      toast.error('Acesso não autorizado, por favor, faça login novamente.')
      setTimeout(async () => {
        await signOut({
          redirect: true,
          callbackUrl: '/login',
        })
      }, 2000)
    }

    const timeout = setTimeout(() => run(), 1000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <React.Fragment>
      <main className="flex h-[75vh] items-center justify-center">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </main>
    </React.Fragment>
  )
}
