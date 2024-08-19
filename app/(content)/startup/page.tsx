import { TypographyH1, TypographyP } from '@/components/typography'

import { Player } from '@/components/player'
import { AUTH } from '@/server/auth'
import { STRAPI } from '@/server/strapi'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { CheckList } from './components/check-list'
import { ProgressSheet } from './components/progress-sheet'
import { TrainingSelectionModal } from './components/training-selection'
import { updateProgress } from './validations'

type Props = {
  searchParams: {
    show?: 'progress' | 'training-selection'
  }
}

export default async function StartupPage({ searchParams: { show } }: Props) {
  const userInfo = await AUTH.getCurrentUser()
  if (!userInfo) {
    redirect('/login')
  }

  let userProgress =
    (await STRAPI.getUserProgress({
      userId: userInfo.id,
      programId: 1,
      jwt: userInfo.jwt,
    })) ?? {}
  userProgress = await updateProgress(userProgress, userInfo)

  const program = await STRAPI.getFullProgram({ id: 1 })

  const isLastSession = userProgress?.sessions?.length === program.numberOfSessions

  const showProgress = show === 'progress'
  const showTrainingSelection = show === 'training-selection'

  return (
    <>
      <main className="mx-auto px-8 pt-16 max-w-[850px]">
        <TypographyH1 className="text-center">
          Seja bem vindo ao Calibrador Auditivo!
        </TypographyH1>
        <TypographyP>
          As atividades do treinamento devem ser realizadas respeitando a ordem abaixo.
          Antes de iniciar seu treinamento,{' '}
          <Link className="underline text-sky-400" href="/startup/instructions">
            leia as instruções
          </Link>{' '}
          e assista ao vídeo abaixo.
        </TypographyP>
        <Player />
        <TypographyP className="text-center">
          Clique na etapa em que parou para continuar.
        </TypographyP>
        <div className="h-[8px]" />
        <CheckList userInfo={userInfo} progress={userProgress} />
        <TypographyP className="text-center">
          Os resultados são atualizados a cada sessão.
        </TypographyP>
        <div className="h-[30px]" />
      </main>
      <Suspense>
        {showProgress && (
          <ProgressSheet progress={userProgress} isLastSession={isLastSession} />
        )}
        {showTrainingSelection && <TrainingSelectionModal progress={userProgress} />}
      </Suspense>
    </>
  )
}
