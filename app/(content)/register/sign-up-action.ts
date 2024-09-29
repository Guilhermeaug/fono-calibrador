'use server'

import { AUTH } from '@/server/auth'
import { RegisterFormType } from './constants'

type SignUpAction = {} & RegisterFormType

export async function signUpAction(payload: SignUpAction) {
  return AUTH.signUp(payload)
}
