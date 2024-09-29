'use server'

import { STRAPI } from '@/server/strapi'

export async function sendContactEmailAction({
  email,
  content,
}: {
  email: string
  content: string
}) {
  return STRAPI.sendContactEmail({ email, content })
}
