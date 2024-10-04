'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { UserProgress } from '@/server/types'
import { ShieldAlertIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { restartSessionsAction } from '../restart-sessions-action'
import { SessionDetails } from './session-details'

type Props = {
  progress: UserProgress
  isOnLastSession: boolean
} & React.ComponentPropsWithoutRef<typeof Sheet>

export function ProgressSheet({
  progress: { sessions, favoriteFeature, status },
  isOnLastSession,
  ...props
}: Props) {
  const router = useRouter()

  function handleOpenChange(open: boolean) {
    if (open === false) {
      router.push('/startup')
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
          </SheetDescription>
          {status === 'INVALID' && (
            <Alert variant="destructive" className="dark:text-white">
              <ShieldAlertIcon className="h-4 w-4" />
              <AlertTitle>Sessão invalidada.</AlertTitle>
              <AlertDescription>
                Sua sessão foi invalidada, e por isso, terá que reiniciar todo o processo
                de avaliação e treinamento.
              </AlertDescription>
              <div className="flex justify-center">
                <Button
                  variant="destructive"
                  className="mt-2 w-full"
                  onClick={() =>
                    restartSessionsAction({
                      programId: 1,
                    })
                  }
                >
                  Reiniciar
                </Button>
              </div>
            </Alert>
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
                  index={index}
                  isOnLastSession={isOnLastSession}
                  favoriteFeature={favoriteFeature}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SheetContent>
    </Sheet>
  )
}
