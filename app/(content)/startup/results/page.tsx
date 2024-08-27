import { TypographyH1 } from '@/components/typography'
import { AUTH } from '@/server/auth'
import { STRAPI } from '@/server/strapi'
import { redirect } from 'next/navigation'
import { Graph } from './components/graph'
import { computateAssessmentsMeanScores } from './helpers'

export default async function ResultsPage() {
  const userInfo = await AUTH.getCurrentUser()
  if (!userInfo) {
    redirect('/login')
  }

  const userProgress = await STRAPI.getUserResults({
    programId: 1,
    jwt: userInfo.jwt,
    userId: userInfo.id,
  })

  const chartData = computateAssessmentsMeanScores(userProgress)

  return (
    <main className="space-y-4 mx-auto px-8 py-8 max-w-[850px]">
      <TypographyH1>Seus resultados</TypographyH1>
      <Graph chartData={chartData} />
    </main>
  )
}
