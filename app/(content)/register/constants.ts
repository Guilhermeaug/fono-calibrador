import { z } from 'zod'

const FILL_FIELD = 'Campo obrigatório'

const formSchema = z
  .object({
    name: z.string().min(3, FILL_FIELD),
    email: z.string().email(FILL_FIELD),
    username: z.string().min(3, FILL_FIELD),
    password: z
      .string()
      .min(6, FILL_FIELD)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{6,}$/,
        'Senha deve conter pelo menos 6 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
      ),
    birthDate: z.date({ required_error: FILL_FIELD }),
    isMusician: z.enum(['yes', 'no'], { required_error: FILL_FIELD }),
    musicianType: z.enum(['profissional', 'amador']).optional(),
    musicianRole: z.array(z.string()).optional(),
    musicianTime: z
      .enum(['1 ano', '1-3 anos', '3-5 anos', '5-10 anos', '10+ anos'])
      .optional(),
    job: z.enum(['profissional', 'estudante', 'professor'], {
      required_error: FILL_FIELD,
    }),
    workUniversity: z.string().min(3, FILL_FIELD).optional(),
    university: z.string().min(3, FILL_FIELD),
    courseLevel: z.array(z.string()).optional(),
    voiceAreaDisciplines: z.enum(['yes', 'no']).optional(),
    graduationPeriod: z
      .enum(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
      .optional(),
    hasExperienceInAuditoryPerceptualAssessment: z.enum(['yes', 'no'], {
      required_error: FILL_FIELD,
    }),
    auditoryPerceptualAssessmentTime: z
      .enum([
        '0-2 hours',
        '2-4 hours',
        '4-6 hours',
        '6-8 hours',
        '8-10 hours',
        '10+ hours',
      ])
      .optional(),
    isVoiceSpecialist: z.enum(['yes', 'no'], { required_error: FILL_FIELD }),
    auditoryPerceptualAssessmentExperience: z.enum(
      ['0-5 anos', '6-10 anos', '11-15 anos', '16-20 anos', '21+ anos', '0 anos'],
      { required_error: FILL_FIELD },
    ),
    isAuditoryPerceptualAssessmentTrained: z.enum(['yes', 'no'], {
      required_error: FILL_FIELD,
    }),
    hasMasterDegree: z.enum(['yes', 'no'], { required_error: FILL_FIELD }),
    hasDoctorateDegree: z.enum(['yes', 'no'], { required_error: FILL_FIELD }),
    hasResearchExperience: z.enum(['yes', 'no'], {
      required_error: FILL_FIELD,
    }),
    hasAcademicArticle: z.enum(['yes', 'no'], { required_error: FILL_FIELD }),
    hearing: z.enum(['normal', 'alterada'], {
      required_error: FILL_FIELD,
    }),
    laterality: z.enum(['destro', 'canhoto', 'ambidestro'], {
      required_error: FILL_FIELD,
    }),
    learningComplaints: z.enum(['yes', 'no'], { required_error: FILL_FIELD }),
  })
  .refine((data) => !(data.isMusician === 'yes' && !data.musicianType), {
    message: FILL_FIELD,
    path: ['musicianType'],
  })
  .refine((data) => !(data.isMusician === 'yes' && !data.musicianRole?.length), {
    message: FILL_FIELD,
    path: ['musicianRole'],
  })
  .refine((data) => !(data.isMusician === 'yes' && !data.musicianTime), {
    message: FILL_FIELD,
    path: ['musicianTime'],
  })
  .refine((data) => !(data.job === 'professor' && !data.workUniversity), {
    message: FILL_FIELD,
    path: ['workUniversity'],
  })
  .refine((data) => !(data.job === 'professor' && !data.courseLevel?.length), {
    message: FILL_FIELD,
    path: ['courseLevel'],
  })
  .refine((data) => !(data.job === 'professor' && !data.voiceAreaDisciplines), {
    message: FILL_FIELD,
    path: ['voiceAreaDisciplines'],
  })
  .refine((data) => !(data.job === 'estudante' && !data.graduationPeriod), {
    message: FILL_FIELD,
    path: ['graduationPeriod'],
  })
  .refine(
    (data) =>
      !(
        data.hasExperienceInAuditoryPerceptualAssessment === 'yes' &&
        !data.auditoryPerceptualAssessmentTime
      ),
    {
      message: FILL_FIELD,
      path: ['auditoryPerceptualAssessmentTime'],
    },
  )

const DEFAULT_VALUES = {
  name: '',
  email: '',
  username: '',
  password: '',
  musicianRole: [],
  courseLevel: [],
}

const musicianRoles = [
  {
    id: 'cantor',
    label: 'Cantor',
  },
  {
    id: 'instrumentista',
    label: 'Instrumentista',
  },
] as const

const courseLevels = [
  {
    id: 'graduate',
    label: 'Graduação',
  },
  {
    id: 'postgraduate',
    label: 'Pós-graduação',
  },
] as const

export { courseLevels, DEFAULT_VALUES, formSchema, musicianRoles }
export type FORM_TYPE = z.infer<typeof formSchema>
