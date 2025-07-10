import { AdditionalData, UserInfo } from '@/server/types'
import { CsvRow } from '@/types'
import dayjs from 'dayjs'
import { Student } from './[classId]/components/columns'

const booleanToYesNo = (value: boolean) => (value ? 'Sim' : 'Não')

export const additionalDataTranslations = {
  id: 'Identificador Usuário',
  name: 'Nome',
  birthDate: 'Data de Nascimento',
  isMusician: 'É músico?',
  musicianType: 'Tipo de músico',
  musicianRole: 'Papel do músico',
  musicianTime: 'Tempo de músico',
  job: 'Profissão',
  workUniversity: 'Universidade de trabalho',
  university: 'Universidade',
  courseLevel: 'Nível do curso',
  voiceAreaDisciplines: 'Disciplinas de área vocal',
  graduationPeriod: 'Período de graduação',
  hasExperienceInAuditoryPerceptualAssessment:
    'Tem experiência em avaliação perceptual auditiva?',
  auditoryPerceptualAssessmentTime: 'Tempo de avaliação perceptual auditiva',
  isVoiceSpecialist: 'É especialista em voz?',
  auditoryPerceptualAssessmentExperience: 'Experiência em avaliação auditiva',
  isAuditoryPerceptualAssessmentTrained: 'Treinado em avaliação auditiva',
  hasMasterDegree: 'Tem mestrado?',
  hasDoctorateDegree: 'Tem doutorado?',
  hasResearchExperience: 'Tem experiência em pesquisa?',
  hasAcademicArticle: 'Tem artigo acadêmico?',
  hearing: 'Audição',
  laterality: 'Lateralidade',
  learningComplaints: 'Queixas de aprendizado',
  phone: 'Telefone',
} as Record<keyof AdditionalData, string>

export const userInfoTranslations = {
  hasAcceptedTerms: 'Aceitou os termos?',
  firstPacStatus: 'Status do PAC',
} as Record<keyof UserInfo, string>

export const xlsxSchemaUserDetails = [
  {
    column: additionalDataTranslations.id,
    type: Number,
    value: (student: Student) => student.id,
  },
  {
    column: additionalDataTranslations.name,
    type: String,
    value: (student: Student) => student.name,
  },
  {
    column: 'Email',
    type: String,
    value: (student: Student) => student.email,
  },
  {
    column: additionalDataTranslations.phone,
    type: String,
    value: (student: Student) => student.additionalData.phone,
  },
  {
    column: additionalDataTranslations.birthDate,
    type: String,
    value: (student: Student) =>
      dayjs(student.additionalData.birthDate).format('DD/MM/YYYY'),
  },
  {
    column: additionalDataTranslations.isMusician,
    type: String,
    value: (student: Student) => booleanToYesNo(student.additionalData.isMusician),
  },
  {
    column: additionalDataTranslations.musicianType,
    type: String,
    value: (student: Student) => student.additionalData.musicianType,
  },
  {
    column: additionalDataTranslations.musicianRole,
    type: String,
    value: (student: Student) => student.additionalData.musicianRole,
  },
  {
    column: additionalDataTranslations.musicianTime,
    type: String,
    value: (student: Student) => student.additionalData.musicianTime,
  },
  {
    column: additionalDataTranslations.job,
    type: String,
    value: (student: Student) => student.additionalData.job,
  },
  {
    column: additionalDataTranslations.workUniversity,
    type: String,
    value: (student: Student) => student.additionalData.workUniversity,
  },
  {
    column: additionalDataTranslations.university,
    type: String,
    value: (student: Student) => student.additionalData.university,
  },
  {
    column: additionalDataTranslations.courseLevel,
    type: String,
    value: (student: Student) => student.additionalData.courseLevel,
  },
  {
    column: additionalDataTranslations.voiceAreaDisciplines,
    type: String,
    value: (student: Student) =>
      booleanToYesNo(student.additionalData.voiceAreaDisciplines),
  },
  {
    column: additionalDataTranslations.graduationPeriod,
    type: String,
    value: (student: Student) => student.additionalData.graduationPeriod,
  },
  {
    column: additionalDataTranslations.hasExperienceInAuditoryPerceptualAssessment,
    type: String,
    value: (student: Student) =>
      booleanToYesNo(student.additionalData.hasExperienceInAuditoryPerceptualAssessment),
  },
  {
    column: additionalDataTranslations.auditoryPerceptualAssessmentTime,
    type: String,
    value: (student: Student) => student.additionalData.auditoryPerceptualAssessmentTime,
  },
  {
    column: additionalDataTranslations.isVoiceSpecialist,
    type: String,
    value: (student: Student) => booleanToYesNo(student.additionalData.isVoiceSpecialist),
  },
  {
    column: additionalDataTranslations.auditoryPerceptualAssessmentExperience,
    type: String,
    value: (student: Student) =>
      student.additionalData.auditoryPerceptualAssessmentExperience,
  },
  {
    column: additionalDataTranslations.isAuditoryPerceptualAssessmentTrained,
    type: String,
    value: (student: Student) =>
      booleanToYesNo(student.additionalData.isAuditoryPerceptualAssessmentTrained),
  },
  {
    column: additionalDataTranslations.hasMasterDegree,
    type: String,
    value: (student: Student) => booleanToYesNo(student.additionalData.hasMasterDegree),
  },
  {
    column: additionalDataTranslations.hasDoctorateDegree,
    type: String,
    value: (student: Student) =>
      booleanToYesNo(student.additionalData.hasDoctorateDegree),
  },
  {
    column: additionalDataTranslations.hasResearchExperience,
    type: String,
    value: (student: Student) =>
      booleanToYesNo(student.additionalData.hasResearchExperience),
  },
  {
    column: additionalDataTranslations.hasAcademicArticle,
    type: String,
    value: (student: Student) =>
      booleanToYesNo(student.additionalData.hasAcademicArticle),
  },
  {
    column: additionalDataTranslations.hearing,
    type: String,
    value: (student: Student) => student.additionalData.hearing,
  },
  {
    column: additionalDataTranslations.laterality,
    type: String,
    value: (student: Student) => student.additionalData.laterality,
  },
  {
    column: additionalDataTranslations.learningComplaints,
    type: String,
    value: (student: Student) =>
      booleanToYesNo(student.additionalData.learningComplaints),
  },
  {
    column: userInfoTranslations.hasAcceptedTerms,
    type: String,
    value: (student: Student) => booleanToYesNo(student.hasAcceptedTerms),
  },
  {
    column: userInfoTranslations.firstPacStatus,
    type: String,
    value: (student: Student) => student.firstPacStatus,
  },
]

export const xlsxSchemaSessionsDetails = [
  {
    column: 'Usuário',
    type: Number,
    value: (session: CsvRow) => session.idUsuario,
  },
  {
    column: 'Sessão',
    type: Number,
    value: (session: CsvRow) => session.sessão,
  },
  {
    column: 'Audio',
    type: String,
    value: (session: CsvRow) => session.identificador,
  },
  {
    column: 'Tipo',
    type: String,
    value: (session: CsvRow) => session.tipo,
  },
  {
    column: 'Parâmetro',
    type: String,
    value: (session: CsvRow) => session.parâmetro,
  },
  {
    column: 'Resposta',
    type: Number,
    value: (session: CsvRow) => session.resposta,
  },
  {
    column: 'Pontuação',
    type: Number,
    value: (session: CsvRow) => session.pontuação,
  },
  {
    column: 'Tentativas',
    type: Number,
    value: (session: CsvRow) => session.tentativas,
  },
  {
    column: 'Vezes que escutou o áudio',
    type: Number,
    value: (session: CsvRow) => session.tentativasAudio,
  },
  {
    column: 'Duração',
    type: Number,
    value: (session: CsvRow) => session.duração,
  },
]
