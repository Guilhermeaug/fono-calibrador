type StrapiDefaultAttributes = {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

type File = {
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
} & StrapiDefaultAttributes

export type Audio = {
  id: number
  identifier: string
  roughness: number[]
  breathiness: number[]
  file: File
}

export type Status = 'NOT_NEEDED' | 'WAITING' | 'READY' | 'DONE' | 'INVALID'

type AudioResult = {
  identifier: string
  answer: number
  duration: number
  numberOfAttempts: number
  score: number
  numberOfAudioClicks: number
}

type SessionResults = {
  assessmentRoughnessResults?: {
    duration: number
    audios: AudioResult[]
  }
  assessmentBreathinessResults?: {
    duration: number
    audios: AudioResult[]
  }
  trainingRoughnessResults?: {
    duration: number
    audios: AudioResult[]
  }
  trainingBreathinessResults?: {
    duration: number
    audios: AudioResult[]
  }
  assessmentStatus: Status
  trainingRoughnessStatus: Status
  trainingBreathinessStatus: Status
} & StrapiDefaultAttributes

export type FullProgram = {
  assessment: Audio[]
  training: Audio[]
  roughnessAnchor: Audio[]
  breathinessAnchor: Audio[]
  numberOfSessions: number
} & StrapiDefaultAttributes

export type ProgramAssessment = {
  assessment: Audio[]
  numberOfSessions: number
} & StrapiDefaultAttributes

export type ProgramTraining = {
  training: Audio[]
  roughnessAnchor: Audio[]
  breathinessAnchor: Audio[]
} & StrapiDefaultAttributes

export type UserProgress = {
  sessions: SessionResults[]
  status: 'READY' | 'DONE' | 'WAITING' | 'INVALID'
  nextDueDate?: string
  timeoutEndDate?: string
} & StrapiDefaultAttributes

export type LoginPayload = {
  identifier: string
  password: string
}

export type UserInfoStepsStatus = 'READY' | 'DONE' | 'WAITING' | 'INVALID' | 'UNAVAILABLE'

export type UserInfo = {
  id: number
  name: string
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  hasAcceptedTerms: boolean
  firstPacStatus: UserInfoStepsStatus
  finalPacStatus: UserInfoStepsStatus
  jwt: string
  pacLink?: string
} & StrapiDefaultAttributes

export type AdditionalData = {
  name: string
  birthDate: string
  isMusician: boolean
  musicianType: string
  musicianRole: string
  musicianTime: string
  job: string
  workUniversity: string
  university: string
  courseLevel: string
  voiceAreaDisciplines: string
  graduationPeriod: string
  hasExperienceInAuditoryPerceptualAssessment: boolean
  auditoryPerceptualAssessmentTime: string
  isVoiceSpecialist: boolean
  auditoryPerceptualAssessmentExperience: string
  isAuditoryPerceptualAssessmentTrained: boolean
  hasMasterDegree: boolean
  hasDoctorateDegree: boolean
  hasResearchExperience: boolean
  hasAcademicArticle: boolean
  hearing: string
} & StrapiDefaultAttributes

export type SubmitAssessmentPayload = {
  programId: number
  startDate: string
  endDate: string
  audios: {
    duration: number
    identifier: string
    roughness: number
    breathiness: number
    numberOfAudioClicks: number
  }[]
}

export type SubmitTrainingPayload = {
  programId: number
  feature: 'roughness' | 'breathiness'
  startDate: string
  endDate: string
  audios: {
    duration: number
    identifier: string
    value: number
    numberOfAttempts: number
    numberOfAudioClicks: number
  }[]
}

export type StrapiError = {
  data: null
  error: {
    status: number
    name: string
    message: string
    details: {}
  }
}
