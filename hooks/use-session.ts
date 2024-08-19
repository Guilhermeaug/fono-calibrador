'use client'

import { useSession as useNextAuthSession } from 'next-auth/react'

export function useSession() {
  const userSession = useNextAuthSession()

  const { data } = userSession
  if (!data) {
    throw new Error('No user session found')
  }

  const {
    user: { id, jwt, email },
  } = data

  return {
    id,
    jwt,
    email,
  }
}
