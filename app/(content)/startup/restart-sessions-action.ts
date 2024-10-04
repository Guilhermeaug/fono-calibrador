'use server'

import { AUTH } from '@/server/auth'
import { STRAPI } from '@/server/strapi'
import { revalidatePath } from 'next/cache'

type RestartSessionsActionParams = {
  programId: number
}

export async function restartSessionsAction(payload: RestartSessionsActionParams) {
  const jwt = await AUTH.getUserJwt()
  await STRAPI.restartSessions({
    ...payload,
    jwt,
  })
  revalidatePath('/startup')
}
