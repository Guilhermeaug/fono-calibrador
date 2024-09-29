'use server'

import { STRAPI } from '@/server/strapi'
import { revalidatePath } from 'next/cache'

export async function acceptInviteAction({
  groupId,
  userId,
}: {
  groupId: number
  userId: number
}) {
  await STRAPI.acceptInvite({
    groupId,
    userId,
  })
  revalidatePath(`/manage/${groupId}`)
}
