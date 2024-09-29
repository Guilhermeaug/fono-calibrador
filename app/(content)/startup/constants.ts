import { Status } from '@/server/types'

const status: Record<Status, string> = {
  WAITING: 'Ainda não disponível',
  READY: 'Etapa disponível',
  DONE: 'Etapa concluída',
  NOT_NEEDED: '',
  INVALID: 'Etapa invalidada',
}

const colors: Record<Status, string> = {
  WAITING: 'text-violet-700 dark:text-violet-500',
  READY: 'text-sky-700 dark:text-sky-500',
  DONE: 'text-emerald-700 dark:text-emerald-500',
  NOT_NEEDED: '',
  INVALID: 'text-destructive',
}

export { colors, status }
