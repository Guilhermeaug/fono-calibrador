'use server'

import { AUTH } from '@/server/auth'
import { STRAPI } from '@/server/strapi'
import { revalidatePath } from 'next/cache'

type SubmitAssessmentAction = {
  programId: number
  startDate: string
  endDate: string
  audios: {
    duration: number
    identifier: string
    roughness: number
    breathiness: number
    numberOfAudioClicks: number
  }[]
}

export async function submitAssessmentAction(payload: SubmitAssessmentAction) {
  const jwt = await AUTH.getUserJwt()
  await STRAPI.submitAssessment({
    jwt,
    ...payload,
  })
  revalidatePath('/startup')
}
