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
  items: z.array(z.string()).refine((value) => value.length === items.length, {
    message: 'Você deve cumprir todos os passos descritos.',
  }),
})

export type Schema = z.infer<typeof schema>
export { items, schema }
