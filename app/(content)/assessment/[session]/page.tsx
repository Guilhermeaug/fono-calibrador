import { TypographyH2 } from '@/components/typography'
import { AUTH } from '@/server/auth'
import { STRAPI } from '@/server/strapi'
import { shuffle } from 'fast-shuffle'
import { redirect } from 'next/navigation'
import { AsssessmentForm } from './components/asessment-form'
import { Suspense } from 'react'

type Props = {
  params: {
    session: string
  }
}

export default async function Page({ params: { session } }: Props) {
  const userSession = await AUTH.getServerSession()
  if (!userSession) {
    redirect('/login')
  }

  const program = await STRAPI.getProgramAssessment({ id: 1 })
  program.assessment = shuffle(program.assessment)

  const asessmentIndex = Math.ceil(Math.sqrt(Number(session)))
  const title = `Sessão ${session} - Avaliação ${asessmentIndex}`
  const isLastSession = Number(session) === program.numberOfSessions

  return (
    <main className="mx-auto max-w-screen-md p-2 lg:p-4 xl:p-8">
      <TypographyH2 className="text-center">{title}</TypographyH2>
      <Suspense>
        <AsssessmentForm {...{ program, isLastSession }} />
      </Suspense>
    </main>
  )
}
