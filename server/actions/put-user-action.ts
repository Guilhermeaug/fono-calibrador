'use server'

import { revalidatePath } from 'next/cache'
import { STRAPI } from '../strapi'
import { UserInfo } from '../types'

type PutUserAction = {
  userId: number
  groupId?: number
  data: Partial<UserInfo>
}

export async function putUserAction(payload: PutUserAction) {
  const res = await STRAPI.putUser(payload)

  if (payload.groupId) {
    revalidatePath(`/manage/${payload.groupId}`)
  }
  revalidatePath('/startup')
  return res
}
