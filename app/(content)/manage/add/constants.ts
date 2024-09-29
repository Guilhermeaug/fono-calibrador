import { z } from 'zod'

const FILL_FIELD = 'Campo obrigatório'

const formSchema = z.object({
  name: z.string().min(3, FILL_FIELD),
})

const DEFAULT_VALUES = {
  name: '',
}

export type CreateGroupFormType = z.infer<typeof formSchema>
export { DEFAULT_VALUES, formSchema }
