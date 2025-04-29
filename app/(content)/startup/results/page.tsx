import { computateAssessmentsMeanScores } from '@/components/charts/helpers'
import { MeanScoresChart } from '@/components/charts/mean-scores'
import { TypographyH1 } from '@/components/typography'
import { AUTH } from '@/server/auth'
import { STRAPI } from '@/server/strapi'
import { redirect } from 'next/navigation'

export default async function ResultsPage() {
  const userInfo = await AUTH.getCurrentUser()
  if (!userInfo) {
    redirect('/login')
  }

  const { sessions } = await STRAPI.getUserResults({
    programId: 1,
    userId: userInfo.id,
  })

  const chartData = computateAssessmentsMeanScores(sessions)

  return (
    <main className="mx-auto max-w-[850px] space-y-8 p-4 lg:p-8 xl:p-16">
      <TypographyH1>Seus resultados</TypographyH1>
      <MeanScoresChart chartData={chartData} />
    </main>
  )
}
