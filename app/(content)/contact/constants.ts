import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Email inválido'),
  content: z.string().min(3, { message: 'Mensagem muito curta' }),
})

export { schema }
export type ContactForm = z.infer<typeof schema>
