'use client'

import { TypographyH1 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { items, schema, Schema } from './constants'

export default function EquipmentCheck() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      items: [],
    },
  })

  function onSubmit(data: Schema) {
    toast.success('Passos validados com sucesso! Redirecionando...')
    const step = searchParams.get('step')
    const session = searchParams.get('session')
    const feature = searchParams.get('feature')

    const pathName = `volume-adjustment?session=${session}&step=${step}${feature ? `&feature=${feature}` : ''}`
    router.push(pathName)
  }

  return (
    <main className="mx-auto grid max-w-[850px] place-content-center space-y-12 p-4 text-justify lg:p-8 xl:p-16">
      <TypographyH1 className="text-center">
        Passos necessários para iniciar o treinamento
      </TypographyH1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid place-content-center space-y-8"
        >
          <FormField
            control={form.control}
            name="items"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Instruções pré-teste</FormLabel>
                </div>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter((value) => value !== item.id),
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{item.label}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="block w-full md:mx-auto" type="submit" size="lg">
            Próximo
          </Button>
        </form>
      </Form>
    </main>
  )
}
