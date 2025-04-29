'use client'

import * as React from 'react'
import { clarity } from 'react-microsoft-clarity'

type MicrosoftClarityProps = {
  userId?: number
}

export default function MicrosoftClarity({ userId }: MicrosoftClarityProps) {
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') return
    clarity.init('nyo09pvgqr')
    if (userId) {
      clarity.identify(String(userId), {})
    }
  }, [userId])

  return null
}
