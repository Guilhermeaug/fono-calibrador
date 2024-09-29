'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import * as React from 'react'

type Props = {
  lightImage: string
  darkImage: string
  className?: string
  imageProps: Omit<React.ComponentProps<typeof Image>, 'src'>
}

export function DualImage({ lightImage, darkImage, imageProps, className = '' }: Props) {
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme = 'light' } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (resolvedTheme === 'light') {
    return <Image src={lightImage} className={className} {...imageProps} />
  }

  if (resolvedTheme === 'dark') {
    return <Image src={darkImage} className={className} {...imageProps} />
  }

  return null
}
