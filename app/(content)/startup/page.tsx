import { TypographyH1, TypographyP } from '@/components/typography'

import { AUTH } from '@/server/auth'
import { STRAPI } from '@/server/strapi'
import { redirect } from 'next/navigation'
import { CheckList } from './components/check-list'
import { ProgressSheet } from './components/progress-sheet'
import { AirVent } from 'lucide-react'

type Props = {
  searchParams: {
    show?: 'progress'
  }
}

export default async function StartupPage({ searchParams: { show } }: Props) {
  const userProgress = await STRAPI.getUserProgress({ id: 1 })
  const userInfo = await AUTH.getCurrentUser()

  console.log('useriNFO', await AUTH.getServerSession())

  const showProgress = show === 'progress'

  if (!userInfo) {
    redirect('/login')
  }

  return (
    <>
      <main className="mx-auto px-8 pt-16 max-w-[850px]">
        <TypographyH1 className="text-center">Seja bem vindo ao Calibrador Auditivo!</TypographyH1>
        <TypographyP className="text-center">
          As atividades do treinamento devem ser realizadas respeitando a ordem abaixo.
        </TypographyP>
        <TypographyP className="text-center">
          Clique na etapa em que parou para continuar.
        </TypographyP>
        <div className="h-[8px]" />
        <CheckList userInfo={userInfo} progress={userProgress} />
        <TypographyP className="text-center">
          Os resultados são atualizados a cada sessão.
        </TypographyP>
      </main>
      {showProgress && <ProgressSheet progress={userProgress} />}
    </>
  )
}
