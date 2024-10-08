'use server'

import { STRAPI } from '@/server/strapi'

export async function getUsersSessionsAction(userIds: number[]) {
  const usersProgress = await STRAPI.getUsersSessionResults({
    programId: 1,
    userIds,
  })
  return usersProgress
}
