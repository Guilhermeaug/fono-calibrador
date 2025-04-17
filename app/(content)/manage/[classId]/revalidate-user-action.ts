'use server'

import { STRAPI } from '@/server/strapi'
import { revalidatePath } from 'next/cache'

async function revalidateUser(userId: number, groupId: number) {
  await STRAPI.revalidateUser({ userId, groupId })
  revalidatePath(`/manage/${groupId}`)
}

export { revalidateUser }
