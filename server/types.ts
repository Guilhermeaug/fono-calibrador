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

export type AudioResult = {
  id: number
  identifier: string
  answer: number
  duration: number
  numberOfAttempts: number
  score: number
  numberOfAudioClicks: number
}

export type Result = {
  audios: AudioResult[]
}

export type SessionResults = {
  assessmentRoughnessResults?: Result
  assessmentBreathinessResults?: Result
  trainingRoughnessResults?: Result
  trainingBreathinessResults?: Result
  assessmentStatus: Status
  trainingRoughnessStatus: Status
  trainingBreathinessStatus: Status
} & StrapiDefaultAttributes

export type Program = {
  numberOfSessions: number
  sessionsThreshold: number[]
} & StrapiDefaultAttributes

export type ProgramAssessment = {
  assessment: Audio[]
} & Program

export type ProgramTraining = {
  training: Audio[]
  roughnessAnchor: Audio[]
  breathinessAnchor: Audio[]
} & Program

export type FullProgram = {
  training: Audio[]
  roughnessAnchor: Audio[]
  breathinessAnchor: Audio[]
} & Program &
  ProgramAssessment &
  ProgramTraining

export type UserStatus = 'READY' | 'DONE' | 'WAITING' | 'INVALID'

export type UserProgress = {
  sessions: SessionResults[]
  status: UserStatus
  favoriteFeature?: 'roughness' | 'breathiness'
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
  voiceAreaDisciplines: boolean
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
  laterality: string
  learningComplaints: boolean
  phone: string
} & StrapiDefaultAttributes

export type UserWithAdditionalData = UserInfo & {
  additionalData: AdditionalData
}

export type UserWithAdditionalDataAndProgressStatus = UserWithAdditionalData & {
  userProgress: {
    id: number
    status: UserStatus
  }
}

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

export type Group = {
  name: string
  students: UserInfo[]
  teacher: UserInfo
  program: FullProgram
} & StrapiDefaultAttributes

export type StrapiError = {
  data: null
  error: {
    status: number
    name: string
    message: string
    details: {}
  }
}
