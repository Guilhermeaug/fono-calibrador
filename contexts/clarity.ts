'use client'

import * as React from 'react'
import { clarity } from 'react-microsoft-clarity'

export default function MicrosoftClarity() {
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') return
    clarity.init('nyo09pvgqr')
  }, [])

  return null
}
