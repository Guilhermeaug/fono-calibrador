import { FORM_TYPE } from '@/app/(content)/register/constants'
import { explodeStrapiData } from '@/lib/utils'
import qs from 'qs'
import { FullProgram, LoginPayload, ProgramAssessment, ProgramTraining, UserProgress } from './types'
import { AUTH } from './auth'

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
  jwt,
  method = 'GET',
  headers: propsHeaders = {},
}: {
  path: string
  body?: Record<string, any>
  jwt?: string
  method?: string
  headers?: Record<string, string>
}) {
  const token = jwt ? jwt : TOKEN
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...propsHeaders,
  }

  return fetch(`${STRAPI_URL}/api${path}`, {
    method,
    body: JSON.stringify(body),
    headers,
    cache: CACHE,
  }).then(async (res) => {
    if (!res.ok) {
      throw await res.json()
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
  ) as UserProgress
  return data
}

async function checkAnswer({
  programId,
  session,
  feature,
  fileIdentifier,
  answer,
}: {
  programId: number
  session: number
  feature: 'roughness' | 'breathiness'
  fileIdentifier: string
  answer: number
}) {
  const data = (await fetchStrapiApi({
    path: '/answer',
    body: {
      programId,
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

async function getCurrentUser(jwt: string) {
  return await fetchStrapiApi({
    path: '/users/me',
    jwt,
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
  getCurrentUser,
}
