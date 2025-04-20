'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { withMask } from 'use-mask-input'
import {
  courseLevels,
  DEFAULT_VALUES,
  formSchema,
  musicianRoles,
  RegisterFormType,
} from '../constants'
import { signUpAction } from '../sign-up-action'

export function RegisterForm() {
  const router = useRouter()

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: DEFAULT_VALUES,
  })

  async function onSubmit(values: RegisterFormType) {
    const res = await signUpAction(values)

    if ('error' in res) {
      switch (res.error.message) {
        case 'Email or Username are already taken': {
          toast.error('Email ou identificador de usuário já estão em uso.')
          form.setError('email', {
            type: 'required',
            message: 'Email ou identificador de usuário já estão em uso.',
          })
          form.setError('username', {
            type: 'required',
            message: 'Email ou identificador de usuário já estão em uso.',
          })
          break
        }
        default:
          toast.error('Erro desconhecido')
          break
      }
      return
    }

    toast.success('Cadastro realizado com sucesso!')
    await signIn('credentials', {
      identifier: values.email,
      password: values.password,
      redirect: false,
    })
    router.replace('/')
    router.refresh()
  }

  const isMusician = form.watch('isMusician') === 'yes'
  const isStudent = form.watch('job') === 'estudante'
  const isTeacher = form.watch('job') === 'professor'
  const hasExperienceInAuditoryPerceptualAssessment =
    form.watch('hasExperienceInAuditoryPerceptualAssessment') === 'yes'

  return (
    <React.Fragment>
      <div className="flex items-center justify-center py-4">
        <div className="mx-auto grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormDescription>
                      Esse nome será exibido para os administradores.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Usuário</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu usuário" {...field} />
                    </FormControl>
                    <FormDescription>
                      Permite que você acesse sua conta de forma mais rápida.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Uma senha segura" {...field} />
                    </FormControl>
                    <FormDescription>
                      Deve conter pelo menos 8 caracteres, com uma letra maiúscula, uma
                      letra minúscula, um número e um caractere especial.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Seu email" {...field} />
                    </FormControl>
                    <FormDescription>
                      Esse email será utilizado para enviar notificações e documentos.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de nascimento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP', { locale: ptBR })
                            ) : (
                              <span>Sua data de nascimento</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown-buttons"
                          fromYear={1900}
                          toYear={new Date().getFullYear()}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Número de celular</FormLabel>
                    <FormControl ref={withMask('(99) 99999-9999')}>
                      <Input placeholder="Seu número de celular" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isMusician"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Você é musicista? (cantor ou instrumental)</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Sim</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">Não</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isMusician && (
                <FormField
                  control={form.control}
                  name="musicianType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Você é musicista</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="profissional" />
                            </FormControl>
                            <FormLabel className="font-normal">Profissional</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="amador" />
                            </FormControl>
                            <FormLabel className="font-normal">Amador</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {isMusician && (
                <FormField
                  control={form.control}
                  name="musicianRole"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Qual é o seu papel na música?</FormLabel>
                      </div>
                      <div className="grid grid-cols-2">
                        {musicianRoles.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="musicianRole"
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
                                          ? field.onChange([
                                              ...(field.value ?? []),
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id,
                                              ),
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {isMusician && (
                <FormField
                  control={form.control}
                  name="musicianTime"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Tempo como musicista</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="1 ano" />
                            </FormControl>
                            <FormLabel className="font-normal">Até um ano</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="1-3 anos" />
                            </FormControl>
                            <FormLabel className="font-normal">1 a 3 anos</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="3-5 anos" />
                            </FormControl>
                            <FormLabel className="font-normal">3 a 5 anos</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="5-10 anos" />
                            </FormControl>
                            <FormLabel className="font-normal">5 a 10 anos</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="10+ anos" />
                            </FormControl>
                            <FormLabel className="font-normal">Mais de 10 anos</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="job"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Na fonoaudiologia você é:</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap gap-2 md:flex-nowrap"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="profissional" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Profissional formado
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="estudante" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Estudante de graduação em fonoaudiologia
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="professor" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Professor em curso de fonoaudiologia
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="university"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Você é/foi estudante de qual universidade?</FormLabel>
                    <FormControl>
                      <Input placeholder="Sua universidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isTeacher && (
                <FormField
                  control={form.control}
                  name="workUniversity"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Você é professor em qual universidade?</FormLabel>
                      <FormControl>
                        <Input placeholder="Sua resposta" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {isTeacher && (
                <FormField
                  control={form.control}
                  name="courseLevel"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Você leciona para qual curso?</FormLabel>
                      </div>
                      <div className="grid grid-cols-2">
                        {courseLevels.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="courseLevel"
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
                                          ? field.onChange([
                                              ...(field.value ?? []),
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id,
                                              ),
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {isTeacher && (
                <FormField
                  control={form.control}
                  name="voiceAreaDisciplines"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Você leciona disciplinas da área de voz?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal">Sim</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">Não</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {isStudent && (
                <FormField
                  control={form.control}
                  name="graduationPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Você está em qual período?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione seu período atual na faculdade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="overflow-y-auto">
                          <SelectGroup>
                            {Array.from({ length: 10 }, (_, i) => (
                              <SelectItem key={i} value={`${i + 1}`}>
                                {i + 1}º período
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="hasExperienceInAuditoryPerceptualAssessment"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Você tem experiência em avaliação perceptivo-auditiva (treinamento
                      em aula ou experiência em atendimento)?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Sim</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">Não</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {hasExperienceInAuditoryPerceptualAssessment && (
                <FormField
                  control={form.control}
                  name="auditoryPerceptualAssessmentTime"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Considera que tem quanto tempo de treinamento</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="0-2 horas" />
                            </FormControl>
                            <FormLabel className="font-normal">0 a 2h</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="2-4 horas" />
                            </FormControl>
                            <FormLabel className="font-normal">2 a 4h</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="4-6 horas" />
                            </FormControl>
                            <FormLabel className="font-normal">4 a 6h</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="6-8 horas" />
                            </FormControl>
                            <FormLabel className="font-normal">6 a 8h</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="8-10 horas" />
                            </FormControl>
                            <FormLabel className="font-normal">8 a 10h</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="10+ horas" />
                            </FormControl>
                            <FormLabel className="font-normal">Mais de 10h</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="isVoiceSpecialist"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Você possui especialização na área de voz?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Sim</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">Não</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="auditoryPerceptualAssessmentExperience"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Você considera que possui quanto tempo de experiência em avaliação
                      perceptivo-auditiva da voz?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="0-5 anos" />
                          </FormControl>
                          <FormLabel className="font-normal">Até 5 anos</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="6-10 anos" />
                          </FormControl>
                          <FormLabel className="font-normal">6 a 10 anos</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="11-15 anos" />
                          </FormControl>
                          <FormLabel className="font-normal">11 a 15 anos</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="16-20 anos" />
                          </FormControl>
                          <FormLabel className="font-normal">16 a 20 anos</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="21+ anos" />
                          </FormControl>
                          <FormLabel className="font-normal">Mais de 21 anos</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="0 anos" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Não possuo experiência
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isAuditoryPerceptualAssessmentTrained"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Já realizou algum treinamento em avaliação perceptivo-auditiva da
                      voz?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Sim</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">Não</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hasMasterDegree"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Possui mestrado com dissertação na área de voz?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Sim</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">Não</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hasDoctorateDegree"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Possui doutorado com tese na área de voz?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Sim</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">Não</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hasResearchExperience"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Realiza ou realizou pesquisas na área de voz?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Sim</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">Não</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hasAcademicArticle"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Possui artigo publicado na área de voz em periódico ≥ B2?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Sim</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">Não</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hearing"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Você considera a sua audição</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="normal" />
                          </FormControl>
                          <FormLabel className="font-normal">Normal</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="alterada" />
                          </FormControl>
                          <FormLabel className="font-normal">Alterada</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="laterality"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Você considera, quanto a lateralidade</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="destro" />
                          </FormControl>
                          <FormLabel className="font-normal">Destro</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="canhoto" />
                          </FormControl>
                          <FormLabel className="font-normal">Canhoto</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="ambidestro" />
                          </FormControl>
                          <FormLabel className="font-normal">Ambidestro</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="learningComplaints"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Você apresenta queixa de aprendizado?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Sim</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">Não</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="block w-full" type="submit">
                Cadastrar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </React.Fragment>
  )
}
