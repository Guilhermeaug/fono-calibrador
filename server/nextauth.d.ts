import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      jwt: string
    } & DefaultSession['user']
  }

  interface User {
    jwt: string
    user: {
      id: number
      username: string
      email: string
      provider: string
      confirmed: boolean
      blocked: boolean
      createdAt: string
      updatedAt: string
      hasAcceptedTerms: boolean
    }
  }
}
