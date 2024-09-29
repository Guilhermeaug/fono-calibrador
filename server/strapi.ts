import { RegisterFormType } from '@/app/(content)/register/constants'
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

async function fetchStrapiApi({
  path,
  body,
  jwt,
  tags = [],
  method = 'GET',
  headers: propsHeaders = {},
}: {
  path: string
  body?: Record<string, any>
  jwt?: string
  tags?: string[]
  method?: string
  headers?: Record<string, string>
}) {
  const token = jwt ?? TOKEN
  const cache = tags.length ? 'default' : 'no-cache'
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...propsHeaders,
  }
  token && (headers['Authorization'] = `Bearer ${token}`)

  return fetch(`${STRAPI_URL}/api${path}`, {
    method,
    body: JSON.stringify(body),
    headers,
    cache,
    ...(tags.length
      ? {
          next: {
            revalidate: 3600,
            tags,
          },
        }
      : {}),
  }).then(async (res) => {
    const json = await res.json()
    if (!res.ok) {
      throw json
    }
    return json
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
      tags: [`program-${id}`],
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
      tags: [`program-${id}`],
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
        $in: userId,
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

async function getUsersSessionResults({
  programId,
  userIds,
}: {
  userIds: number[]
  programId: number
}) {
  const query = qs.stringify({
    filters: {
      program: {
        $eq: programId,
      },
      user: {
        $in: userIds,
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
      user: {
        fields: ['id'],
      },
    },
  })

  return explodeStrapiData(
    await fetchStrapiApi({
      path: `/users-progress?${query}`,
    }),
  ) as (UserProgress & {
    user: {
      id: number
    }
  })[]
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
  return fetchStrapiApi({
    path: '/email/contact',
    body: data,
    method: 'POST',
  })
}

async function sendEmailTemplate(data: {
  templateReferenceId: number
  to: string
  data: Record<string, any>
}) {
  await fetchStrapiApi({
    path: '/email/sendEmailTemplate',
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

async function getUser({ userId }: { userId: number }) {
  const data = await fetchStrapiApi({
    path: `/users/${userId}`,
  })
  return explodeStrapiData(data) as UserInfo
}

async function putUser({
  userId,
  data,
}: {
  userId: number
  data: Partial<UserInfo>
}) {
  return fetchStrapiApi({
    path: `/users/${userId}`,
    body: data,
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

async function createGroup({ data }: { data: Partial<Group> }) {
  return fetchStrapiApi({
    path: '/groups',
    body: {
      data,
    },
    method: 'POST',
  })
}

async function deleteGroup({ groupId }: { groupId: number }) {
  return fetchStrapiApi({
    path: `/groups/${groupId}`,
    method: 'DELETE',
  })
}

async function removeUserFromGroup({
  groupId,
  userId,
}: {
  groupId: number
  userId: number
}) {
  return fetchStrapiApi({
    path: `/groups/${groupId}`,
    body: {
      data: {
        students: {
          disconnect: [userId],
        },
      },
    },
    method: 'PUT',
  })
}

async function acceptInvite({ userId, groupId }: { userId: number; groupId: number }) {
  return fetchStrapiApi({
    path: `/groups/${groupId}`,
    body: {
      data: {
        students: {
          connect: [userId],
        },
      },
    },
    method: 'PUT',
  })
}

async function setFavoriteFeature({ id, feature }: { id: number; feature: string }) {
  return fetchStrapiApi({
    path: `/users-progress/${id}`,
    body: {
      data: {
        favoriteFeature: feature,
      },
    },
    method: 'PUT',
  })
}

async function getProgramById({ id }: { id: number }) {
  return fetchStrapiApi({
    path: `/programs/${id}`,
    tags: [`program-${id}`],
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

async function signUp(data: RegisterFormType) {
  return fetchStrapiApi({
    path: '/auth/local/register',
    body: data,
    method: 'POST',
  })
}

async function getCurrentUser(jwt: string) {
  return fetchStrapiApi({
    path: '/users/me',
    jwt,
  })
}

async function sendResetPasswordToken(data: { email: string }) {
  return fetchStrapiApi({
    path: '/auth/forgot-password',
    body: data,
    method: 'POST',
  })
}

async function resetPassword(data: { code: string; password: string }) {
  return fetchStrapiApi({
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
  sendEmailTemplate,
  getStudentsInClass,
  getUserFullData,
  putUser,
  getTeachersGroups,
  createGroup,
  acceptInvite,
  deleteGroup,
  removeUserFromGroup,
  getUsersSessionResults,
  setFavoriteFeature,
  getProgramById,
  getUser,
  /////////
  login,
  signUp,
  getCurrentUser,
  sendResetPasswordToken,
  resetPassword,
}
