import { TypographyH1, TypographyP } from '@/components/typography'

import { STRAPI } from '@/server/strapi'
import { CheckList } from './components/check-list'
import { ProgressSheet } from './components/progress-sheet'

type Props = {
  searchParams: {
    show?: 'progress'
  }
}

export default async function StartupPage({ searchParams: { show } }: Props) {
  const userProgress = await STRAPI.getUserProgress({ id: 1 })

  const showProgress = show === 'progress'

  return (
    <>
      <main className="mx-auto max-w-[850px] px-8 pt-16">
        <TypographyH1 className="text-center">Seja bem vindo ao Calibrador Auditivo!</TypographyH1>
        <TypographyP className="text-center">
          As atividades do treinamento devem ser realizadas respeitando a ordem abaixo.
        </TypographyP>
        <TypographyP className="text-center">
          Clique na etapa em que parou para continuar.
        </TypographyP>
        <div className="h-[8px]" />
        <CheckList />
        <TypographyP className="text-center">
          Os resultados são atualizados a cada sessão.
        </TypographyP>
      </main>
      {showProgress && <ProgressSheet />}
    </>
  )
}
