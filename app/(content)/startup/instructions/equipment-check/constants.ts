import { z } from 'zod'

const items = [
  {
    id: 'v-1',
    label: 'Declaro estar usando um fone de ouvido supra-auricular',
  },
  {
    id: 'v-2',
    label: 'Declaro estar usando um fone de ouvido intra-auricular',
  },
  {
    id: 'v-3',
    label: 'Declaro estar em um ambiente silencioso',
  },
] as const

const schema = z.object({
  items: z
    .array(z.string())
    .refine(
      (value) => {
        if (value.includes('v-1') && value.includes('v-2')) {
          return false
        }
        return true
      },
      {
        message: 'Selecione apenas um tipo de fone de ouvido',
      },
    )
    .refine(
      (value) => {
        if (!value.includes('v-3')) {
          return false
        }
        return true
      },
      {
        message: 'Você precisa estar em um ambiente silencioso',
      },
    ),
})

export type Schema = z.infer<typeof schema>
export { items, schema }
