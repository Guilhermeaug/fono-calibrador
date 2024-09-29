'use server'

import { STRAPI } from '@/server/strapi'

export async function sendEmailTemplateAction(
  to: string,
  data: Record<string, any>,
  templateReferenceId: number,
) {
  await STRAPI.sendEmailTemplate({
    to,
    data,
    templateReferenceId,
  })
}
