import { AudioResult, SessionResults } from '@/server/types'
import { CsvRow } from '@/types'

function sortAudiosByIdentifier(a: AudioResult, b: AudioResult) {
  return a.identifier.localeCompare(b.identifier)
}

function exportData(sessions: SessionResults[], userId: number) {
  const data: CsvRow[] = []

  sessions.forEach((session, idx) => {
    const trainingBreathinessResults = session.trainingBreathinessResults
    const trainingRoughnessResults = session.trainingRoughnessResults
    const assessmentBreathinessResults = session.assessmentBreathinessResults
    const assessmentRoughnessResults = session.assessmentRoughnessResults

    if (trainingBreathinessResults) {
      trainingBreathinessResults.audios.sort(sortAudiosByIdentifier).forEach((audio) => {
        data.push({
          idUsuario: userId,
          sessão: idx + 1,
          identificador: audio.identifier,
          tipo: 'Treino',
          parâmetro: 'Soprosidade',
          resposta: audio.answer,
          pontuação: audio.score,
          duração: audio.duration,
          tentativas: audio.numberOfAttempts,
          tentativasAudio: audio.numberOfAudioClicks,
        })
      })
    }

    if (trainingRoughnessResults) {
      trainingRoughnessResults.audios.sort(sortAudiosByIdentifier).forEach((audio) => {
        data.push({
          idUsuario: userId,
          sessão: idx + 1,
          identificador: audio.identifier,
          tipo: 'Treino',
          parâmetro: 'Rugosidade',
          resposta: audio.answer,
          pontuação: audio.score,
          duração: audio.duration,
          tentativas: audio.numberOfAttempts,
          tentativasAudio: audio.numberOfAudioClicks,
        })
      })
    }

    if (assessmentBreathinessResults) {
      assessmentBreathinessResults.audios
        .sort(sortAudiosByIdentifier)
        .forEach((audio) => {
          data.push({
            idUsuario: userId,
            sessão: idx + 1,
            identificador: audio.identifier,
            tipo: 'Avaliação',
            parâmetro: 'Soprosidade',
            resposta: audio.answer,
            pontuação: audio.score,
            duração: audio.duration,
            tentativas: audio.numberOfAttempts,
            tentativasAudio: audio.numberOfAudioClicks,
          })
        })
    }

    if (assessmentRoughnessResults) {
      assessmentRoughnessResults.audios.sort(sortAudiosByIdentifier).forEach((audio) => {
        data.push({
          idUsuario: userId,
          sessão: idx + 1,
          identificador: audio.identifier,
          tipo: 'Avaliação',
          parâmetro: 'Rugosidade',
          resposta: audio.answer,
          pontuação: audio.score,
          duração: audio.duration,
          tentativas: audio.numberOfAttempts,
          tentativasAudio: audio.numberOfAudioClicks,
        })
      })
    }
  })

  return data
}

export { exportData }
