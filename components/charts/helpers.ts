import { SessionResults } from '@/server/types'
import { mean } from 'simple-statistics'

function computateAssessmentsMeanScores(sessions: SessionResults[]) {
  const roughnessAssessmentResults = sessions.map(
    (session) =>
      session.assessmentRoughnessResults?.audios.map((audio) => audio.score) || [],
  )
  const breathinessAssessmentResults = sessions.map(
    (session) =>
      session.assessmentBreathinessResults?.audios.map((audio) => audio.score) || [],
  )

  if (
    roughnessAssessmentResults.every((result) => result.length === 0) ||
    breathinessAssessmentResults.every((result) => result.length === 0)
  ) {
    return []
  }

  const chartData: {
    session: string
    roughness: number | null
    breathiness: number | null
  }[] = []
  for (let i = 0; i < sessions.length; i++) {
    if (!roughnessAssessmentResults[i].length || !breathinessAssessmentResults.length) {
      continue
    }
    chartData.push({
      session: `Sessão ${i + 1}`,
      roughness: roughnessAssessmentResults[i]
        ? mean(roughnessAssessmentResults[i])
        : null,
      breathiness: breathinessAssessmentResults[i]
        ? mean(breathinessAssessmentResults[i])
        : null,
    })
  }

  return chartData
}

export { computateAssessmentsMeanScores }
