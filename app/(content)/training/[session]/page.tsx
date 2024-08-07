import { TypographyH2 } from '@/components/typography'
import { STRAPI } from '@/server/strapi'
import { shuffle } from 'fast-shuffle'
import { AnchorAside } from './components/AnchorAside'
import { TrainingForm } from './components/TrainingForm'

type Props = {
  params: {
    session: string
  }
  searchParams: {
    feature?: 'roughness' | 'breathiness'
  }
}

export default async function Page({ params: { session }, searchParams: { feature } }: Props) {
  if (!feature || !['roughness', 'breathiness'].includes(feature)) {
    throw new Error('Feature is required')
  }

  const program = await STRAPI.getProgramTraining({ id: 1 })
  program.training = shuffle(program.training)

  const title = `Sessão ${session} - Treinamento`
  return (
    <main className="mx-auto max-w-[1024px] px-3 pt-16 md:px-8">
      <TypographyH2>{title}</TypographyH2>
      <div className="h-[40px]" />
      <div className="grid justify-between gap-6 md:grid-cols-[auto,auto]">
        <TrainingForm program={program} feature={feature} session={parseInt(session)} />
        <AnchorAside feature={feature} program={program} />
      </div>
    </main>
  )
}
