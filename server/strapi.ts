import { FORM_TYPE } from '@/app/(content)/register/constants'
import { explodeStrapiData } from '@/lib/utils'
import qs from 'qs'
import { FullProgram, LoginPayload, ProgramAssessment, ProgramTraining } from './types'

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL
const TOKEN = process.env.NEXT_PUBLIC_TOKEN
const CACHE = process.env.NEXT_PUBLIC_CACHE as
  | 'no-cache'
  | 'default'
  | 'reload'
  | 'force-cache'
  | 'only-if-cached'

function fetchStrapiApi({
  path,
  body,
  method = 'GET',
  headers: propsHeaders = {},
}: {
  path: string
  body?: Record<string, any>
  method?: string
  headers?: Record<string, string>
}) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
    ...propsHeaders,
  }

  return fetch(`${STRAPI_URL}/api${path}`, {
    method,
    body: JSON.stringify(body),
    headers,
    cache: CACHE,
  }).then((res) => {
    if (!res.ok) {
      throw res.json()
    }
    return res.json()
  })
}

async function getFullProgram({ id }: { id: number }) {
  const data = explodeStrapiData(
    await fetchStrapiApi({
      path: `/programs/${id}?populate=deep`,
    }),
  ) as FullProgram
  return data
}

async function getProgramAssessment({ id }: { id: number }) {
  const query = qs.stringify({
    populate: {
      assessment: {
        populate: ['file'],
      },
    },
  })

  const data = explodeStrapiData(
    await fetchStrapiApi({
      path: `/programs/${id}?${query}`,
    }),
  ) as ProgramAssessment

  return data
}

async function getProgramTraining({ id }: { id: number }) {
  const query = qs.stringify({
    populate: {
      training: {
        populate: ['file'],
      },
      roughnessAnchor: {
        populate: ['file'],
      },
      breathinessAnchor: {
        populate: ['file'],
      },
    },
  })

  const data = explodeStrapiData(
    await fetchStrapiApi({
      path: `/programs/${id}?${query}`,
    }),
  ) as ProgramTraining
  return data
}

async function getUserProgress({ id }: { id: number }) {
  const query = qs.stringify({
    populate: ['sessions'],
  })

  const data = explodeStrapiData(
    await fetchStrapiApi({
      path: `/users-progress/${id}?${query}`,
    }),
  ) as any
  return data
}

async function checkAnswer({
  programId,
  section,
  session,
  feature,
  fileIdentifier,
  answer,
}: {
  programId: number
  section: 'assessment' | 'training'
  session: number
  feature: 'roughness' | 'breathiness'
  fileIdentifier: string
  answer: number
}) {
  const data = (await fetchStrapiApi({
    path: '/answer',
    body: {
      programId,
      section,
      feature,
      fileIdentifier,
      answer,
      session,
    },
    method: 'POST',
  })) as { result: boolean }
  return data.result
}

async function login(loginPayload: LoginPayload) {
  const data = await fetchStrapiApi({
    path: '/auth/local',
    body: loginPayload,
    method: 'POST',
  })
  return data
}

async function signUp(data: FORM_TYPE) {
  return await fetchStrapiApi({
    path: '/auth/local/register',
    body: data,
    method: 'POST',
  })
}

export const STRAPI = {
  getFullProgram,
  getProgramAssessment,
  getProgramTraining,
  checkAnswer,
  getUserProgress,
  /////////
  login,
  signUp,
}
