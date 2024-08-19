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
import { STRAPI } from '@/server/strapi'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ContactForm, schema } from './constants'

export default function ContactPage() {
  const form = useForm<ContactForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      content: '',
    },
  })

  async function onSubmit(values: ContactForm) {
    await STRAPI.sendContactEmail(values)
    toast.success('Mensagem enviada com sucesso! Em breve entraremos em contato.')
  }

  return (
    <main className="mx-auto max-w-[850px] px-8 pt-16 grid place-content-center">
      <section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-[600px] space-y-6">
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
                      className="resize-none h-[200px]"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="block ml-auto" size="lg" type="submit">
              Enviar
            </Button>
          </form>
        </Form>
      </section>
      <div className="h-[50px]" />
      <Link
        className="text-center"
        href="mailto:contato@calibradorauditivo.com"
        target="_blank"
      >
        Ou envie seu e-mail para <b>contato@calibradorauditivo.com</b>
      </Link>
    </main>
  )
}
