import { z } from "zod";

const FILL_FIELD = "Campo obrigatório";

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
        "Senha deve conter pelo menos 6 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
      ),
    birthDate: z.date({ required_error: FILL_FIELD }),
    isMusician: z.enum(["yes", "no"], { required_error: FILL_FIELD }),
    musicianType: z
      .enum(["professional", "amateur", "singer", "instrumentalist"])
      .optional(),
    musicianTime: z
      .enum(["1-year", "1-3 years", "3-5 years", "5-10 years", "10+ years"])
      .optional(),
    job: z.enum(["professional", "student"], { required_error: FILL_FIELD }),
    university: z.string().min(3, FILL_FIELD),
    graduationPeriod: z
      .enum(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])
      .optional(),
    hasExperienceInAuditoryPerceptualAssessment: z.enum(["yes", "no"], {
      required_error: FILL_FIELD,
    }),
    auditoryPerceptualAssessmentTime: z
      .enum([
        "0-2 hours",
        "2-4 hours",
        "4-6 hours",
        "6-8 hours",
        "8-10 hours",
        "10+ hours",
      ])
      .optional(),
    isVoiceSpecialist: z.enum(["yes", "no"], { required_error: FILL_FIELD }),
    auditoryPerceptualAssessmentExperience: z.enum(
      [
        "0-5 years",
        "6-10 years",
        "11-15 years",
        "16-20 years",
        "21+ years",
        "0 years",
      ],
      { required_error: FILL_FIELD },
    ),
    isAuditoryPerceptualAssessmentTrained: z.enum(["yes", "no"], {
      required_error: FILL_FIELD,
    }),
    hasMasterDegree: z.enum(["yes", "no"], { required_error: FILL_FIELD }),
    hasDoctorateDegree: z.enum(["yes", "no"], { required_error: FILL_FIELD }),
    hasResearchExperience: z.enum(["yes", "no"], {
      required_error: FILL_FIELD,
    }),
    hasAcademicArticle: z.enum(["yes", "no"], { required_error: FILL_FIELD }),
    hearing: z.enum(["normal", "changed"], {
      required_error: FILL_FIELD,
    }),
  })
  .refine((data) => !(data.isMusician === "yes" && !data.musicianType), {
    message: FILL_FIELD,
    path: ["musicianType"],
  })
  .refine((data) => !(data.isMusician === "yes" && !data.musicianTime), {
    message: FILL_FIELD,
    path: ["musicianTime"],
  })
  .refine((data) => !(data.job === "student" && !data.graduationPeriod), {
    message: FILL_FIELD,
    path: ["graduationPeriod"],
  })
  .refine(
    (data) =>
      !(
        data.hasExperienceInAuditoryPerceptualAssessment === "yes" &&
        !data.auditoryPerceptualAssessmentTime
      ),
    {
      message: FILL_FIELD,
      path: ["auditoryPerceptualAssessmentTime"],
    },
  );

const DEFAULT_VALUES = {
  name: "",
  email: "",
  username: "",
  password: "",
};

export { formSchema, DEFAULT_VALUES };
export type FORM_TYPE = z.infer<typeof formSchema>;
