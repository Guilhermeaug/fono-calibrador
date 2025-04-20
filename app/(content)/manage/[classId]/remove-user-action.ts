'use server'

import { STRAPI } from '@/server/strapi'
import { revalidatePath } from 'next/cache'

async function removeUserFromGroup(groupId: number, userId: number) {
  await STRAPI.removeUserFromGroup({ groupId, userId })

  revalidatePath(`/manage/${groupId}`)
}

export { removeUserFromGroup }
