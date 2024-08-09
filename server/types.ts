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
  
} & StrapiDefaultAttributes

export type LoginPayload = {
  identifier: string
  password: string
}

export type StrapiError = {
  data: any
  error: {
    status: number
    name: string
    message: string
    details: {}
  }
}
