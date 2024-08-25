import { AdditionalData } from '@/server/types'

export const translations = {
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
} as Record<keyof AdditionalData, string>
