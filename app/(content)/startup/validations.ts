import { STRAPI } from '@/server/strapi'
import { UserInfo, UserProgress } from '@/server/types'
import dayjs from 'dayjs'

async function updateProgress(
  userProgress: UserProgress,
  userInfo: UserInfo,
): Promise<UserProgress> {
  const { id, status, nextDueDate, timeoutEndDate } = userProgress

  const now = dayjs()
  const dueDate = nextDueDate ? dayjs(nextDueDate) : null
  const timeoutEnd = timeoutEndDate ? dayjs(timeoutEndDate) : null

  switch (status) {
    case 'WAITING':
      if (dueDate && now.isAfter(dueDate)) {
        userProgress.status = 'READY'
        await STRAPI.updateUserProgress({
          jwt: userInfo.jwt,
          id,
          body: { status: 'READY' },
        })
      } else if (timeoutEnd && now.isAfter(timeoutEnd)) {
        userProgress.status = 'INVALID'
        await STRAPI.updateUserProgress({
          jwt: userInfo.jwt,
          id,
          body: { status: 'INVALID' },
        })
      }
      break
    case 'READY':
      if (timeoutEnd && now.isAfter(timeoutEnd)) {
        userProgress.status = 'INVALID'
        await STRAPI.updateUserProgress({
          jwt: userInfo.jwt,
          id,
          body: { status: 'INVALID' },
        })
      }
      break
  }

  return userProgress
}

export { updateProgress }
