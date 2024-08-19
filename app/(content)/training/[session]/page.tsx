import { TypographyH2 } from '@/components/typography'
import { AUTH } from '@/server/auth'
import { STRAPI } from '@/server/strapi'
import { shuffle } from 'fast-shuffle'
import { redirect } from 'next/navigation'
import { Anchor } from './components/anchor'
import { TrainingFormBasic } from './components/training-form-basic'
import { TrainingFormBoth } from './components/training-form-both'

type Props = {
  params: {
    session: string
  }
  searchParams: {
    feature?: 'roughness' | 'breathiness' | 'both'
  }
}

export default async function Page({
  params: { session },
  searchParams: { feature },
}: Props) {
  const userSession = await AUTH.getServerSession()
  if (!userSession) {
    redirect('/login')
  }

  if (!feature || ['roughness', 'breathiness', 'both'].includes(feature) === false) {
    throw new Error('Feature is required')
  }

  const program = await STRAPI.getProgramTraining({ id: 1 })
  program.training = shuffle(program.training)

  const isOneFeature = feature === 'both' ? false : true
  const title = `Sessão ${session} - Treinamento de ${isOneFeature ? translateFeature(feature) : 'Rugosidade e Soprosidade'}`

  return (
    <main className="mx-auto max-w-[1024px] px-3 pt-16 md:px-8">
      <TypographyH2>{title}</TypographyH2>
      <div className="h-[40px]" />
      <div className="grid justify-between gap-6 md:grid-cols-[1fr,auto]">
        {isOneFeature ? (
          <TrainingFormBasic
            audios={program.training}
            feature={feature as 'roughness' | 'breathiness'}
            userSession={userSession}
            sessionNumber={parseInt(session)}
          />
        ) : (
          <TrainingFormBoth
            audios={program.training}
            feature="both"
            userSession={userSession}
            sessionNumber={parseInt(session)}
          />
        )}
        {isOneFeature && (
          <Anchor feature={feature as 'roughness' | 'breathiness'} program={program} />
        )}
      </div>
      {!isOneFeature && (
        <div className="grid gap-4 grid-cols-2 mt-12">
          <Anchor feature="roughness" program={program} />
          <Anchor feature="breathiness" program={program} />
        </div>
      )}
    </main>
  )
}

function translateFeature(feature: string) {
  return feature === 'roughness' ? 'Rugosidade' : 'Soprosidade'
}
