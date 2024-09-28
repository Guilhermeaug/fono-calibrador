'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { UserProgress } from '@/server/types'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { SessionDetails } from './session-details'

type Props = {
  progress: UserProgress
  isOnLastSession: boolean
} & React.ComponentPropsWithoutRef<typeof Sheet>

export function ProgressSheet({
  progress: { sessions, favoriteFeature },
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

