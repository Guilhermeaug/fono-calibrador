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