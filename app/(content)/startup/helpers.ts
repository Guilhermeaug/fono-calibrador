import { UserInfo, UserProgress } from '@/server/types'

export type CheckListItemType = {
  text: string
  href: string
  status: CheckListStatus
  canClickIf: boolean
}

enum CheckListStatus {
  READY = 'READY',
  WAITING = 'WAITING',
  UNAVAILABLE = 'UNAVAILABLE',
  DONE = 'DONE',
  INVALID = 'INVALID',
}

function getStatusForTerms(hasAcceptedTerms: boolean): CheckListStatus {
  return hasAcceptedTerms ? CheckListStatus.DONE : CheckListStatus.READY
}

function getStatusForPac(
  hasAcceptedTerms: boolean,
  pacStatus: CheckListStatus,
): CheckListStatus {
  if (!hasAcceptedTerms) return CheckListStatus.UNAVAILABLE
  return pacStatus === CheckListStatus.DONE ? CheckListStatus.DONE : CheckListStatus.READY
}

function getStatusForTraining(
  previous: boolean,
  progress: UserProgress,
): CheckListStatus {
  if (!previous) return CheckListStatus.UNAVAILABLE
  return progress.status as CheckListStatus
}

function getStatusForFinalPac(
  previous: boolean,
  pacStatus: CheckListStatus,
): CheckListStatus {
  if (!previous) return CheckListStatus.UNAVAILABLE
  return pacStatus === CheckListStatus.DONE ? CheckListStatus.DONE : CheckListStatus.READY
}

export function generateChecklistItems(
  userInfo: UserInfo,
  progress: UserProgress,
): CheckListItemType[] {
  const { hasAcceptedTerms, firstPacStatus, finalPacStatus } = userInfo

  const termsStatus = getStatusForTerms(hasAcceptedTerms)
  const firstPacChecklistStatus = getStatusForPac(
    termsStatus === CheckListStatus.DONE,
    firstPacStatus as CheckListStatus,
  )
  const trainingStatus = getStatusForTraining(
    firstPacChecklistStatus === CheckListStatus.DONE,
    progress,
  )
  const finalPacChecklistStatus = getStatusForFinalPac(
    trainingStatus === CheckListStatus.DONE,
    finalPacStatus as CheckListStatus,
  )

  return [
    {
      text: '1. Termo de Consentimento Livre e Esclarecido',
      href: '/startup/terms',
      status: termsStatus,
      canClickIf: true,
    },
    {
      text: '2. Teste do Processamento Auditivo',
      href: '/startup/pac/begin',
      status: firstPacChecklistStatus,
      canClickIf: ['READY'].includes(firstPacChecklistStatus),
    },
    {
      text: '3. Treinamento de Avaliação Perceptivo-Auditiva da Voz',
      href: '?show=progress',
      status: trainingStatus,
      canClickIf: ['DONE'].includes(firstPacChecklistStatus),
    },
    {
      text: '4. Teste do Processamento Auditivo',
      href: '/startup/pac/begin',
      status: finalPacChecklistStatus,
      canClickIf: ['READY'].includes(finalPacChecklistStatus),
    },
    {
      text: 'Resultados',
      href: '/startup/results',
      status:
        firstPacStatus === 'DONE' ? CheckListStatus.DONE : CheckListStatus.UNAVAILABLE,
      canClickIf: firstPacStatus === 'DONE',
    },
  ]
}
