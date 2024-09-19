'use client'

import { Button } from '@/components/ui/button'
import { getCsvConfig } from '@/lib/csv'
import { AudioResult, SessionResults } from '@/server/types'
import dayjs from 'dayjs'
import { download, generateCsv } from 'export-to-csv'

type Props = {
  sessions: SessionResults[]
}

type CsvRow = {
  sessão: number
  identificador: string
  tipo: string
  parâmetro: string
  pontuação: number
  duração: number
  tentativas: number
  tentativasAudio: number
}

function sortAudiosByIdentifier(a: AudioResult, b: AudioResult) {
  return a.identifier.localeCompare(b.identifier)
}

export function ExportButton({ sessions }: Props) {
  function exportData() {
    const data: CsvRow[] = []
    sessions.forEach((session, idx) => {
      const trainingBreathinessResults = session.trainingBreathinessResults
      const trainingRoughnessResults = session.trainingRoughnessResults
      const assessmentBreathinessResults = session.assessmentBreathinessResults
      const assessmentRoughnessResults = session.assessmentRoughnessResults

      if (trainingBreathinessResults) {
        trainingBreathinessResults.audios
          .sort(sortAudiosByIdentifier)
          .forEach((audio) => {
            data.push({
              sessão: idx + 1,
              identificador: audio.identifier,
              tipo: 'Treino',
              parâmetro: 'Soprosidade',
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
            sessão: idx + 1,
            identificador: audio.identifier,
            tipo: 'Treino',
            parâmetro: 'Rugosidade',
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
              sessão: idx + 1,
              identificador: audio.identifier,
              tipo: 'Avaliação',
              parâmetro: 'Soprosidade',
              pontuação: audio.score,
              duração: audio.duration,
              tentativas: audio.numberOfAttempts,
              tentativasAudio: audio.numberOfAudioClicks,
            })
          })
      }

      if (assessmentRoughnessResults) {
        assessmentRoughnessResults.audios
          .sort(sortAudiosByIdentifier)
          .forEach((audio) => {
            data.push({
              sessão: idx + 1,
              identificador: audio.identifier,
              tipo: 'Avaliação',
              parâmetro: 'Rugosidade',
              pontuação: audio.score,
              duração: audio.duration,
              tentativas: audio.numberOfAttempts,
              tentativasAudio: audio.numberOfAudioClicks,
            })
          })
      }
    })

    const currentTime = dayjs().format('YYYY-MM-DD_HH-mm-ss')
    const csvConfig = getCsvConfig(`resultados_${currentTime}.csv`)
    const csv = generateCsv(csvConfig)(data)
    download(csvConfig)(csv)
  }

  return <Button onClick={exportData}>Exportar dados</Button>
}
