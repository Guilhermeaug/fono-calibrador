'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { defaultValues, formSchema, LoginFormType } from '../constants'

export function LoginForm() {
  const router = useRouter()

  const form = useForm<LoginFormType>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: defaultValues,
  })

  async function onSubmit(values: LoginFormType) {
    const res = await signIn('credentials', {
      identifier: values.identifier,
      password: values.password,
      redirect: false,
    })

    if (res?.ok) {
      toast.success('Login realizado com sucesso')
      router.replace('/')
      router.refresh()
      return
    }

    switch (res?.error) {
      case 'Your account email is not confirmed': {
        toast.error('Sua conta de e-mail não foi confirmada')
        break
      }
      case 'Invalid identifier or password': {
        toast.error('Identificador ou senha inválidos')
        break
      }
      default: {
        toast.error('Erro desconhecido')
        console.error(res?.error)
      }
    }
  }

  return (
    <React.Fragment>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Identificador</FormLabel>
                <FormControl>
                  <Input placeholder="Seu usuário ou email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col">
                <div className="flex items-center">
                  <FormLabel>Senha</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
                <FormControl>
                  <Input type="password" placeholder="Sua senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </React.Fragment>
  )
}
