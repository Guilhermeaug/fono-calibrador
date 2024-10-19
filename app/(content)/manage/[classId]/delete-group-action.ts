'use server'

import { STRAPI } from '@/server/strapi'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function deleteGroup(groupId: number) {
  await STRAPI.deleteGroup({ groupId })
  revalidatePath('/manage')
  redirect('/manage/add')
}

export { deleteGroup }
