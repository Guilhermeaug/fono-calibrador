'use server'

import { STRAPI } from '@/server/strapi'
import { Group } from '@/server/types'
import { revalidatePath } from 'next/cache'

type CreateGroupAction = {
  data: Partial<Group>
}

export async function createGroupAction(payload: CreateGroupAction) {
  const res = await STRAPI.createGroup(payload)
  revalidatePath('/manage')
  return res
}
