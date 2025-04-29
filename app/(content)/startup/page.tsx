import { TypographyH1, TypographyP } from '@/components/typography'

import { Player } from '@/components/player'
import { AUTH } from '@/server/auth'
import { STRAPI } from '@/server/strapi'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import * as React from 'react'
import { Suspense } from 'react'
import { CheckList } from './components/check-list'
import { ProgressSheet } from './components/progress-sheet'
import { TrainingSelectionModal } from './components/training-selection'

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

  const userProgress = await STRAPI.alignProgress({
    userId: userInfo.id,
    programId: 1,
    jwt: userInfo.jwt,
  })

  const program = await STRAPI.getProgramById({ id: 1 })

  const showProgress = show === 'progress'
  const showTrainingSelection = show === 'training-selection'

  return (
    <React.Fragment>
      <main className="mx-auto max-w-[850px] p-4 lg:p-8 xl:p-16">
        <TypographyH1 className="text-center">
          Progresso no programa
        </TypographyH1>
        <TypographyP>
          As atividades do treinamento devem ser realizadas respeitando a ordem abaixo.
          Antes de iniciar seu treinamento,{' '}
          <Link className="text-sky-400 underline" href="/startup/instructions">
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
      </main>
      <Suspense>
        {showProgress && <ProgressSheet progress={userProgress} program={program} />}
        {showTrainingSelection && <TrainingSelectionModal progress={userProgress} />}
      </Suspense>
    </React.Fragment>
  )
}
