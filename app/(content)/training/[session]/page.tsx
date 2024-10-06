import { TypographyH2 } from '@/components/typography'
import { cn, translateFeature } from '@/lib/utils'
import { AUTH } from '@/server/auth'
import { STRAPI } from '@/server/strapi'
import { shuffle } from 'fast-shuffle'
import { redirect } from 'next/navigation'
import { Anchor } from './components/anchor'
import { TrainingForm } from './components/training-form'

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
  const title = `Sessão ${session} - Treinamento de ${translateFeature(feature)}`

  const style = cn('flex flex-col gap-6 md:flex-row', !isOneFeature && 'justify-center')

  return (
    <main className="container py-8">
      <TypographyH2>{title}</TypographyH2>
      <div className="h-[20px]" />
      <p>
        Se não conseguir escutar o áudio, clique em algum ponto da tela e tente novamente.
        Em último caso, reinicie a página.
      </p>
      <div className="h-[30px]" />
      <div className={style}>
        <TrainingForm sessionNumber={Number(session)} {...{ feature, program }} />
        {isOneFeature && (
          <Anchor feature={feature as 'roughness' | 'breathiness'} program={program} />
        )}
      </div>
      {!isOneFeature && (
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <Anchor feature="roughness" program={program} />
          <Anchor feature="breathiness" program={program} />
        </div>
      )}
    </main>
  )
}
