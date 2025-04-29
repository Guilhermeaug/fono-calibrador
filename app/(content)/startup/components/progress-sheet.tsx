'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Program, UserProgress } from '@/server/types'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { restartSessionsAction } from '../restart-sessions-action'
import { SessionDetails } from './session-details'

type Props = {
  progress: UserProgress
  program: Program
} & React.ComponentPropsWithoutRef<typeof Sheet>

export function ProgressSheet({
  progress: { sessions, status },
  program,
  ...props
}: Props) {
  const router = useRouter()

  function handleOpenChange(open: boolean) {
    if (open === false) {
      router.push('/startup')
      router.refresh()
    }
  }

  return (
    <Sheet defaultOpen onOpenChange={handleOpenChange} {...props}>
      <SheetContent className="w-full overflow-y-scroll sm:w-3/4">
        <SheetHeader>
          <SheetTitle>Progresso no programa</SheetTitle>
          <SheetDescription className="text-justify">
            Acompanhe por aqui o seu progresso no programa de treinamento. Verifique os
            itens pendentes de ação ou que estão bloqueados.
            <br /> <br />
            Lembre-se: Você pode fazer apenas um dos treinamentos por dia.
            <br /> <br />
            <span className="text-blue-600">
              Você está atualmente na sessão {sessions.length} de{' '}
              {program.numberOfSessions}
            </span>
          </SheetDescription>
          {status === 'INVALID' && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="mt-2 w-full">
                  Reiniciar progresso
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Sessão invalidada.</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                  Sua sessão foi invalidada, e por isso, terá que reiniciar todo o
                  processo de avaliação e treinamento. Tem certeza que deseja continuar?
                </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      restartSessionsAction({
                        programId: program.id,
                      })
                    }
                  >
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </SheetHeader>
        <div className="h-[30px]" />
        <Accordion type="multiple" defaultValue={[String(sessions.length - 1)]}>
          {sessions.map((session, index) => (
            <AccordionItem key={session.id} value={String(index)}>
              <AccordionTrigger>Sessão {index + 1}</AccordionTrigger>
              <AccordionContent className="grid gap-2">
                <SessionDetails
                  session={session}
                  numberOfSessions={program.numberOfSessions}
                  index={index}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SheetContent>
    </Sheet>
  )
}
