import { TypographyH2, TypographyH4 } from '@/components/typography'
import { translateFeature } from '@/lib/utils'
import { AUTH } from '@/server/auth'
import { STRAPI } from '@/server/strapi'
import { shuffle } from 'fast-shuffle'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { AnchorGroup } from './components/anchor-group'
import { AnchorSheet } from './components/anchor-sheet'
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

  const title = `Sessão ${session} - Treinamento de ${translateFeature(feature)}`
  const hasRoughnessFeature = feature === 'roughness' || feature === 'both'
  const hasBreathinessFeature = feature === 'breathiness' || feature === 'both'

  return (
    <main className="mx-auto p-2 lg:p-4 xl:p-8">
      <TypographyH2 className="text-center">{title}</TypographyH2>
      <div className="mt-1 flex items-center justify-center gap-3 md:hidden">
        <TypographyH4 className="font-bold text-blue-600 dark:text-blue-500">
          Âncoras:
        </TypographyH4>
        {hasRoughnessFeature && <AnchorSheet feature="roughness" program={program} />}
        {hasBreathinessFeature && <AnchorSheet feature="breathiness" program={program} />}
      </div>
      <div className="mt-4 md:grid md:grid-cols-2">
        <Suspense>
          <TrainingForm sessionNumber={Number(session)} {...{ feature, program }} />
        </Suspense>
        <div className="hidden md:block">
          <AnchorGroup type="single" feature={feature} program={program} />
        </div>
      </div>
    </main>
  )
}
