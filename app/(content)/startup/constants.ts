import { Status } from '@/server/types'

const status: Record<Status, string> = {
  WAITING: 'Ainda não disponível',
  READY: 'Etapa disponível',
  DONE: 'Etapa concluída',
  NOT_NEEDED: '',
}

export { status }
