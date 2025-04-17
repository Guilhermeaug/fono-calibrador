'use server'

import { STRAPI } from '@/server/strapi'
import { revalidatePath } from 'next/cache'

async function clearUserTimeout(userId: number, groupId: number) {
  await STRAPI.clearUserTimeout({ userId })
  revalidatePath(`/manage/${groupId}`)
}

export { clearUserTimeout }
