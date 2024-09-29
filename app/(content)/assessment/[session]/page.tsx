import { TypographyH2 } from '@/components/typography'
import { AUTH } from '@/server/auth'
import { STRAPI } from '@/server/strapi'
import { shuffle } from 'fast-shuffle'
import { redirect } from 'next/navigation'
import { AsssessmentForm } from './components/asessment-form'

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

  const isLastSession = Number(session) === program.numberOfSessions

  const asessmentIndex = Math.ceil(Math.sqrt(Number(session)))
  const title = `Sessão ${session} - Avaliação ${asessmentIndex}`
  return (
    <main className="container grid w-full auto-cols-fr place-content-center justify-items-center py-10">
      <TypographyH2>{title}</TypographyH2>
      <div className="h-[20px]" />
      <AsssessmentForm {...{ program, isLastSession }} />
    </main>
  )
}
