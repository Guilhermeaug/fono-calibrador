import { UserInfo, UserProgress } from "@/server/types";

type CheckListStatus = 'READY' | 'WAITING_TIME' | 'UNAVAILABLE' | 'DONE'
export type CheckListItemType = {
    text: string
    href: string
    status: CheckListStatus
    canClickIf: boolean
}

export function getItems(userInfo: UserInfo, progress: UserProgress) {
    const { hasAcceptedTerms, hasCompletedPac } = userInfo
    const isProgressReady = progress.status === 'READY';
    const isProgressDone = progress.status === 'DONE';

    const items: CheckListItemType[] = [
        {
            text: '1. Termo de Consentimento Livre e Esclarecido',
            href: '/terms',
            status: hasAcceptedTerms ? 'DONE' : 'READY',
            canClickIf: true
        },
        {
            text: '2. Teste do Processamento Auditivo',
            href: '/pac/begin',
            status: hasAcceptedTerms ? (hasCompletedPac ? 'DONE' : 'READY') : 'UNAVAILABLE',
            canClickIf: !hasCompletedPac
        },
        {
            text: '3. Treinamento de Avaliação Perceptivo-Auditiva da Voz',
            href: '?show=progress',
            status: hasCompletedPac ? (isProgressReady ? 'READY' : 'WAITING_TIME') : 'UNAVAILABLE',
            canClickIf: hasCompletedPac
        },
        {
            text: '4. Teste do Processamento Auditivo',
            href: '',
            status: hasCompletedPac && isProgressDone ? 'DONE' : (isProgressDone ? 'READY' : 'UNAVAILABLE'),
            canClickIf: isProgressDone
        },
        {
            text: 'Resultados',
            href: '',
            status: hasCompletedPac ? 'DONE' : 'UNAVAILABLE',
            canClickIf: hasCompletedPac
        },
    ];

    return items;
}