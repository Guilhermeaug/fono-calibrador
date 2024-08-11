import { Status } from "@/server/types"

const status: Record<Status, string> = {
  WAITING: 'Aguardando o tempo entre treinamentos',
  READY: 'Etapa disponível',
  DONE: 'Etapa concluída',
  NOT_NEEDED: '',
}

export { status }
