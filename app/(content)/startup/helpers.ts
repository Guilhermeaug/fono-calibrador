import { UserInfo, UserProgress } from '@/server/types'

enum CheckListStatus {
  READY = 'READY',
  WAITING = 'WAITING',
  UNAVAILABLE = 'UNAVAILABLE',
  DONE = 'DONE',
  INVALID = 'INVALID',
}

export type CheckListItemType = {
  text: string
  href: string
  status: CheckListStatus
  canClickIf: boolean
}

function getStatusForPac(
  hasAcceptedTerms: boolean,
  hasCompletedPac: boolean,
): CheckListStatus {
  if (!hasAcceptedTerms) return CheckListStatus.UNAVAILABLE
  return hasCompletedPac ? CheckListStatus.DONE : CheckListStatus.READY
}

function getStatusForFinalPac(
  hasCompletedFinalPac: boolean,
  isProgressDone: boolean,
): CheckListStatus {
  if (hasCompletedFinalPac && isProgressDone) return CheckListStatus.DONE
  return isProgressDone ? CheckListStatus.READY : CheckListStatus.UNAVAILABLE
}

export function generateChecklistItems(userInfo: UserInfo, progress: UserProgress) {
  const { hasAcceptedTerms, hasCompletedPac, hasCompletedFinalPac } = userInfo
  const isProgressReady = progress.status === CheckListStatus.READY
  const isProgressDone = progress.status === CheckListStatus.DONE
  const isProgressInvalid = progress.status === CheckListStatus.INVALID

  const items: CheckListItemType[] = [
    {
      text: '1. Termo de Consentimento Livre e Esclarecido',
      href: '/startup/terms',
      status: hasAcceptedTerms ? CheckListStatus.DONE : CheckListStatus.READY,
      canClickIf: true,
    },
    {
      text: '2. Teste do Processamento Auditivo',
      href: '/startup/pac/begin',
      status: getStatusForPac(hasAcceptedTerms, hasCompletedPac),
      canClickIf: false,
    },
    {
      text: '3. Treinamento de Avaliação Perceptivo-Auditiva da Voz',
      href: '?show=progress',
      status: isProgressReady
        ? CheckListStatus.READY
        : isProgressInvalid
          ? CheckListStatus.INVALID
          : CheckListStatus.WAITING,
      canClickIf: ['READY', 'WAITING', 'DONE'].includes(progress.status),
    },
    {
      text: '4. Teste do Processamento Auditivo',
      href: '/startup/pac/begin',
      status: getStatusForFinalPac(hasCompletedFinalPac, isProgressDone),
      canClickIf: false,
    },
    {
      text: 'Resultados',
      href: '/startup/results',
      status: hasCompletedPac ? CheckListStatus.DONE : CheckListStatus.UNAVAILABLE,
      canClickIf: false,
    },
  ]

  // Update canClickIf based on the status of the previous item
  for (let i = 1; i < items.length; i++) {
    const prevItem = items[i - 1]
    if (
      prevItem.status === CheckListStatus.READY ||
      prevItem.status === CheckListStatus.DONE
    ) {
      items[i].canClickIf = true
    } else {
      items[i].status = CheckListStatus.UNAVAILABLE
      items[i].canClickIf = false
    }
  }

  return items
}
