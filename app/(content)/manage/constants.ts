import { AdditionalData } from '@/server/types'
import { CsvRow } from '@/types'
import dayjs from 'dayjs'
import { Student } from './[classId]/components/columns'

const booleanToYesNo = (value: boolean) => (value ? 'Sim' : 'Não')

export const translations = {
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

export const xlsxSchemaUserDetails = [
  {
    column: translations.id,
    type: Number,
    value: (student: Student) => student.id,
  },
  {
    column: translations.name,
    type: String,
    value: (student: Student) => student.name,
  },
  {
    column: 'Email',
    type: String,
    value: (student: Student) => student.email,
  },
  {
    column: translations.phone,
    type: String,
    value: (student: Student) => student.additionalData.phone,
  },
  {
    column: translations.birthDate,
    type: String,
    value: (student: Student) =>
      dayjs(student.additionalData.birthDate).format('DD/MM/YYYY'),
  },
  {
    column: translations.isMusician,
    type: String,
    value: (student: Student) => booleanToYesNo(student.additionalData.isMusician),
  },
  {
    column: translations.musicianType,
    type: String,
    value: (student: Student) => student.additionalData.musicianType,
  },
  {
    column: translations.musicianRole,
    type: String,
    value: (student: Student) => student.additionalData.musicianRole,
  },
  {
    column: translations.musicianTime,
    type: String,
    value: (student: Student) => student.additionalData.musicianTime,
  },
  {
    column: translations.job,
    type: String,
    value: (student: Student) => student.additionalData.job,
  },
  {
    column: translations.workUniversity,
    type: String,
    value: (student: Student) => student.additionalData.workUniversity,
  },
  {
    column: translations.university,
    type: String,
    value: (student: Student) => student.additionalData.university,
  },
  {
    column: translations.courseLevel,
    type: String,
    value: (student: Student) => student.additionalData.courseLevel,
  },
  {
    column: translations.voiceAreaDisciplines,
    type: String,
    value: (student: Student) =>
      booleanToYesNo(student.additionalData.voiceAreaDisciplines),
  },
  {
    column: translations.graduationPeriod,
    type: String,
    value: (student: Student) => student.additionalData.graduationPeriod,
  },
  {
    column: translations.hasExperienceInAuditoryPerceptualAssessment,
    type: String,
    value: (student: Student) =>
      booleanToYesNo(student.additionalData.hasExperienceInAuditoryPerceptualAssessment),
  },
  {
    column: translations.auditoryPerceptualAssessmentTime,
    type: String,
    value: (student: Student) => student.additionalData.auditoryPerceptualAssessmentTime,
  },
  {
    column: translations.isVoiceSpecialist,
    type: String,
    value: (student: Student) => booleanToYesNo(student.additionalData.isVoiceSpecialist),
  },
  {
    column: translations.auditoryPerceptualAssessmentExperience,
    type: String,
    value: (student: Student) =>
      student.additionalData.auditoryPerceptualAssessmentExperience,
  },
  {
    column: translations.isAuditoryPerceptualAssessmentTrained,
    type: String,
    value: (student: Student) =>
      booleanToYesNo(student.additionalData.isAuditoryPerceptualAssessmentTrained),
  },
  {
    column: translations.hasMasterDegree,
    type: String,
    value: (student: Student) => booleanToYesNo(student.additionalData.hasMasterDegree),
  },
  {
    column: translations.hasDoctorateDegree,
    type: String,
    value: (student: Student) =>
      booleanToYesNo(student.additionalData.hasDoctorateDegree),
  },
  {
    column: translations.hasResearchExperience,
    type: String,
    value: (student: Student) =>
      booleanToYesNo(student.additionalData.hasResearchExperience),
  },
  {
    column: translations.hasAcademicArticle,
    type: String,
    value: (student: Student) =>
      booleanToYesNo(student.additionalData.hasAcademicArticle),
  },
  {
    column: translations.hearing,
    type: String,
    value: (student: Student) => student.additionalData.hearing,
  },
  {
    column: translations.laterality,
    type: String,
    value: (student: Student) => student.additionalData.laterality,
  },
  {
    column: translations.learningComplaints,
    type: String,
    value: (student: Student) =>
      booleanToYesNo(student.additionalData.learningComplaints),
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
