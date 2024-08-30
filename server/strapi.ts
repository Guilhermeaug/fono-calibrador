import { FORM_TYPE } from '@/app/(content)/register/constants'
import { explodeStrapiData } from '@/lib/utils'
import qs from 'qs'
import {
  AdditionalData,
  FullProgram,
  Group,
  LoginPayload,
  ProgramAssessment,
  ProgramTraining,
  SubmitAssessmentPayload,
  SubmitTrainingPayload,
  UserInfo,
  UserProgress,
} from './types'

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL
const TOKEN = process.env.TOKEN
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
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...propsHeaders,
  }
  token && (headers['Authorization'] = `Bearer ${token}`)

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

async function getUserProgress({
  programId,
  userId,
  jwt,
}: {
  userId: number
  programId: number
  jwt: string
}) {
  const query = qs.stringify({
    filters: {
      program: {
        $eq: programId,
      },
      user: {
        $eq: userId,
      },
    },
    populate: ['sessions'],
  })

  const data = explodeStrapiData(
    await fetchStrapiApi({
      path: `/users-progress?${query}`,
      jwt,
    }),
  ) as UserProgress[]
  return data && data[0]
}

async function updateUserProgress({
  id,
  jwt,
  body,
}: {
  id: number
  jwt: string
  body: Partial<UserProgress>
}) {
  const data = await fetchStrapiApi({
    path: `/users-progress/${id}`,
    body: { data: body },
    jwt,
    method: 'PUT',
  })
  return data as UserProgress
}

async function getUserResults({
  programId,
  userId,
  jwt = TOKEN,
}: {
  userId: number
  programId: number
  jwt?: string
}) {
  const query = qs.stringify({
    filters: {
      program: {
        $eq: programId,
      },
      user: {
        $eq: userId,
      },
    },
    populate: {
      sessions: {
        populate: {
          assessmentRoughnessResults: {
            populate: ['audios'],
          },
          assessmentBreathinessResults: {
            populate: ['audios'],
          },
          trainingRoughnessResults: {
            populate: ['audios'],
          },
          trainingBreathinessResults: {
            populate: ['audios'],
          },
        },
      },
    },
  })

  const data = explodeStrapiData(
    await fetchStrapiApi({
      path: `/users-progress?${query}`,
      jwt,
    }),
  ) as UserProgress[]
  return data && data[0]
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

async function submitAssessment({
  jwt,
  ...payload
}: SubmitAssessmentPayload & { jwt: string }) {
  const data = await fetchStrapiApi({
    path: '/users-progress/submit/assessment',
    body: payload,
    jwt,
    method: 'POST',
  })
  return data as Promise<any>
}

async function submitTraining({
  jwt,
  ...payload
}: SubmitTrainingPayload & { jwt: string }) {
  const data = await fetchStrapiApi({
    path: '/users-progress/submit/training',
    body: payload,
    jwt,
    method: 'POST',
  })
  return data as any
}

async function acceptTerms({ userId, jwt }: { userId: number; jwt: string }) {
  await fetchStrapiApi({
    path: '/users-progress/terms',
    body: {
      userId: userId,
      jwt,
    },
    method: 'POST',
  })
}

async function acceptPac({ userId, jwt }: { userId: number; jwt: string }) {
  await fetchStrapiApi({
    path: '/users-progress/pac',
    body: {
      userId: userId,
      jwt,
    },
    method: 'POST',
  })
}

async function alignProgress({
  userId,
  programId,
  jwt,
}: {
  userId: number
  programId: number
  jwt: string
}) {
  return (await fetchStrapiApi({
    path: '/users-progress/alignProgress',
    body: {
      userId,
      programId,
      jwt,
    },
    method: 'POST',
  })) as UserProgress
}

async function sendContactEmail(data: { email: string; content: string }) {
  await fetchStrapiApi({
    path: '/email/contact',
    body: data,
    method: 'POST',
  })
}

async function getStudentsInClass({ groupId, jwt }: { groupId: number; jwt: string }) {
  const query = qs.stringify({
    fields: ['id'],
    populate: {
      students: true,
    },
  })
  const data = await fetchStrapiApi({
    path: `/groups/${groupId}?${query}`,
    jwt,
  })
  return explodeStrapiData(data.data.attributes.students) as UserInfo[]
}

async function getUserFullData({ userId }: { userId: number }) {
  const query = qs.stringify({
    fields: ['id'],
    populate: {
      additionalData: true,
    },
  })
  const data = await fetchStrapiApi({
    path: `/users/${userId}?${query}`,
  })
  return explodeStrapiData(data.additionalData) as AdditionalData
}

async function putUser({
  userId,
  jwt,
  data,
}: {
  userId: number
  jwt: string
  data: Partial<UserInfo>
}) {
  return await fetchStrapiApi({
    path: `/users/${userId}`,
    body: data,
    jwt,
    method: 'PUT',
  })
}

async function getTeachersGroups({ userId, jwt }: { userId: number; jwt: string }) {
  const query = qs.stringify({
    filters: {
      teacher: {
        $eq: userId,
      },
    },
  })
  const data = await fetchStrapiApi({
    path: `/groups?${query}`,
    jwt,
  })
  return explodeStrapiData(data) as Group[]
}

async function createGroup({ jwt, data }: { jwt: string; data: Partial<Group> }) {
  return await fetchStrapiApi({
    path: '/groups',
    body: {
      data,
    },
    jwt,
    method: 'POST',
  })
}

async function acceptInvite({
  jwt,
  userId,
  groupId,
}: {
  jwt: string
  userId: number
  groupId: number
}) {
  return await fetchStrapiApi({
    path: `/groups/${groupId}`,
    body: {
      data: {
        students: {
          connect: [userId],
        },
      },
    },
    jwt,
    method: 'PUT',
  })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

async function sendResetPasswordToken(data: { email: string }) {
  return await fetchStrapiApi({
    path: '/auth/forgot-password',
    body: data,
    method: 'POST',
  })
}

async function resetPassword(data: { code: string; password: string }) {
  return await fetchStrapiApi({
    path: '/auth/reset-password',
    body: {
      code: data.code,
      password: data.password,
      passwordConfirmation: data.password,
    },
    method: 'POST',
  })
}

export const STRAPI = {
  getFullProgram,
  getProgramAssessment,
  getProgramTraining,
  checkAnswer,
  getUserProgress,
  updateUserProgress,
  getUserResults,
  acceptTerms,
  acceptPac,
  alignProgress,
  submitAssessment,
  submitTraining,
  sendContactEmail,
  getStudentsInClass,
  getUserFullData,
  putUser,
  getTeachersGroups,
  createGroup,
  acceptInvite,
  /////////
  login,
  signUp,
  getCurrentUser,
  sendResetPasswordToken,
  resetPassword,
}
