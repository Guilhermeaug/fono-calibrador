export type AssessmentEvaluationData = {
  duration: number
  identifier: string
  numberOfAudioClicks: number
  roughness: number
  breathiness: number
}

export type TraningEvaluationDataOneFeature = {
  duration: number
  identifier: string
  numberOfAttempts: number
  numberOfAudioClicks: number
  value: number
}

export type TraningEvaluationDataBothFeatures = {
  duration: number
  identifier: string
  numberOfAttempts: number
  numberOfAudioClicks: number
  roughness: number
  breathiness: number
}

export type VoiceFormData = {
  identifier: string
  duration: number
  numberOfAudioClicks: number
  numberOfAttempts: number
  data: {
    feature: string
    value: number
  }[]
}

export type VoiceFormDataBackup = {
  timestamp: string
  features: string[]
  backup: VoiceFormData[]
}

export type CsvRow = {
  sessão: number
  identificador: string
  tipo: string
  parâmetro: string
  pontuação: number
  duração: number
  tentativas: number
  tentativasAudio: number
}