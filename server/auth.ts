import { RegisterFormType } from '@/app/(content)/register/constants'
import { AuthOptions, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { revalidatePath } from 'next/cache'
import { STRAPI } from './strapi'
import { LoginPayload, StrapiError, UserWithAdditionalData } from './types'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        identifier: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          if (credentials == null) return null
          const { user, jwt } = await login({
            identifier: credentials.identifier,
            password: credentials.password,
          })
          revalidatePath('/', 'layout')
          return { ...user, jwt }
        } catch (e) {
          const error = e as StrapiError
          throw error.error.message
            ? new Error(error.error.message)
            : new Error('Unknown Error')
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user.id = token.id as number
      session.user.jwt = token.jwt as string
      session.user.name = token.name as string
      return Promise.resolve(session)
    },
    jwt: async ({ token, user }) => {
      const isSignIn = !!user
      if (isSignIn) {
        token.id = user.id
        token.jwt = user.jwt
      }
      return Promise.resolve(token)
    },
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
}

async function login(loginPayload: LoginPayload) {
  return STRAPI.login(loginPayload)
}

async function signUp(data: RegisterFormType) {
  const dataCopy: any = { ...data }
  for (const key in dataCopy) {
    if (dataCopy[key] === 'yes') {
      dataCopy[key] = true
    } else if (dataCopy[key] === 'no') {
      dataCopy[key] = false
    }
  }
  dataCopy.musicianRole = dataCopy.musicianRole.join(';')
  dataCopy.courseLevel = dataCopy.courseLevel.join(';')

  try {
    await STRAPI.signUp(dataCopy)
    return {}
  } catch (error: any) {
    return error
  }
}

async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  const jwt = session?.user.jwt
  const id = session?.user.id
  if (jwt == null) return null
  if (id == null) return null
  const strapiUser = await STRAPI.getCurrentUser(jwt, id)
  return {
    ...strapiUser,
    jwt,
  } as Promise<UserWithAdditionalData>
}

async function getUserJwt() {
  const session = await getServerSession(authOptions)
  return session?.user.jwt ?? ''
}

async function sendResetPasswordToken(data: { email: string }) {
  return STRAPI.sendResetPasswordToken(data)
}

async function resetPassword(data: { code: string; password: string }) {
  return STRAPI.resetPassword(data)
}

export const AUTH = {
  getServerSession: () => getServerSession(authOptions),
  login,
  signUp,
  getCurrentUser,
  getUserJwt,
  sendResetPasswordToken,
  resetPassword,
}
