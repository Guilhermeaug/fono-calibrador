import { AdditionalData } from '@/server/types'

function isUserTeacher(data?: AdditionalData) {
  return data?.job === 'professor'
}

export { isUserTeacher }
