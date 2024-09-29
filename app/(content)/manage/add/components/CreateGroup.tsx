'use client'

import { TypographyMuted } from '@/components/typography'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Group, UserInfo } from '@/server/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createGroupAction } from '../../create-group-action'
import { CreateGroupFormType, DEFAULT_VALUES, formSchema } from '../constants'

type Props = {
  userInfo: UserInfo
}

export function CreateGroup({ userInfo }: Props) {
  const form = useForm<CreateGroupFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_VALUES,
  })

  async function onSubmit(data: CreateGroupFormType) {
    await createGroupAction({
      data: {
        teacher: userInfo.id,
        ...data,
      } as unknown as Partial<Group>,
    })
    toast.success('Turma criada com sucesso!')
  }

  return (
    <div className="mt-4 grid gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Esse nome vai identificar sua turma." {...field} />
                </FormControl>
                <FormDescription>Dê um nome significativo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <TypographyMuted>
            Observe que criar turmas é uma forma de permitir que outros usuários
            compartilhem o progresso deles com você.
          </TypographyMuted>
          <Button className="block w-full" type="submit">
            Cadastrar
          </Button>
        </form>
      </Form>
    </div>
  )
}
