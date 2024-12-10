'use server'

import { AUTH } from '@/server/auth'
import { STRAPI } from '@/server/strapi'

export async function sendTermsEmailAction() {
  const jwt = await AUTH.getUserJwt()
  return STRAPI.sendTermsEmail({ jwt })
}
