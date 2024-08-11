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

type Audio = {
  id: number
  identifier: string
  roughness: number[]
  breathiness: number[]
  file: File
}

export type Status = 'NOT_NEEDED' | 'WAITING' | 'READY' | 'DONE'

type Result = {
  duration: number
}

type AudioResult = {
  identifier: string
  answer: number
  duration: number
  numberOfAttempts: number
}

type SessionResults = {
  assessmentResults?: {
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
} & StrapiDefaultAttributes

export type ProgramAssessment = {
  assessment: Audio[]
} & StrapiDefaultAttributes

export type ProgramTraining = {
  training: Audio[]
  roughnessAnchor: Audio[]
  breathinessAnchor: Audio[]
} & StrapiDefaultAttributes

export type UserProgress = {
  sessions: SessionResults[]
  status: "READY" | "DONE" | "WAITING_TIME"
} & StrapiDefaultAttributes

export type LoginPayload = {
  identifier: string
  password: string
}

export type UserInfo = {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  hasAcceptedTerms: boolean
  hasCompletedPac: boolean
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
