import { TypographyH2 } from '@/components/typography'
import { AUTH } from '@/server/auth'
import { STRAPI } from '@/server/strapi'
import { shuffle } from 'fast-shuffle'
import { redirect } from 'next/navigation'
import { AsssessmentForm } from './components/assessment-form'

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

  const isLastSession = parseInt(session) === program.numberOfSessions

  const title = `Sessão ${session} - Avaliação ${session}`
  return (
    <main className="mx-auto max-w-[850px] px-8 pt-16">
      <TypographyH2>{title}</TypographyH2>
      <div className="h-[40px]" />
      <AsssessmentForm
        audios={program.assessment}
        userSession={userSession}
        isLastSession={isLastSession}
      />
    </main>
  )
}
