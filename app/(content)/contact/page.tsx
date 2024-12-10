'use client'

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
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ContactFormType, schema } from './constants'
import { sendContactEmailAction } from './send-contact-email-action'

export default function ContactPage() {
  const form = useForm<ContactFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      content: '',
    },
  })

  async function onSubmit(values: ContactFormType) {
    await sendContactEmailAction(values)
    toast.success('Mensagem enviada com sucesso! Em breve entraremos em contato.')
  }

  React.useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset()
    }
  }, [form])

  return (
    <main className="mx-auto max-w-[850px] px-2 py-8 lg:px-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seu email principal</FormLabel>
                <FormControl>
                  <Input placeholder="mm@gmail.com" {...field} />
                </FormControl>
                <FormDescription>Esse será seu email de contato</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conteúdo</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escreva aqui a sua mensagem"
                    className="h-[200px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="ml-auto block w-full" size="lg" type="submit">
            Enviar
          </Button>
        </form>
      </Form>
      <div className="h-[30px]" />
      <Link
        className="text-center text-sm underline"
        href="mailto:calibradorauditivo@mkt.medicina.ufmg.br"
        target="_blank"
      >
        Ou envie seu e-mail para <b>calibradorauditivo@mkt.medicina.ufmg.br</b>
      </Link>
    </main>
  )
}
