'use server'

import { AUTH } from '@/server/auth'
import { STRAPI } from '@/server/strapi'
import { revalidatePath } from 'next/cache'

type SubmitTrainingAction = {
  programId: number
  feature: 'roughness' | 'breathiness'
  startDate: string
  endDate: string
  audios: {
    value: number
    identifier: string
    duration: number
    numberOfAudioClicks: number
    numberOfAttempts: number
  }[]
}

export async function submitTrainingAction(payload: SubmitTrainingAction) {
  const jwt = await AUTH.getUserJwt()
  await STRAPI.submitTraining({
    jwt,
    ...payload,
  })
  revalidatePath('/startup')
}
