'use client'

import { useRouter } from 'next/navigation'
import { Button, ButtonProps } from './ui/button'

export function BackButton({ ...props }: ButtonProps) {
  const router = useRouter()

  function onClick() {
    router.back()
  }

  return <Button onClick={onClick} {...props} />
}
