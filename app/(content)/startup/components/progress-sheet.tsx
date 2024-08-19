'use client'

import { TypographyLarge } from '@/components/typography'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { UserProgress } from '@/server/types'
import { Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { status } from '../constants'

type Props = {
  progress: UserProgress
  isLastSession: boolean
} & React.ComponentPropsWithoutRef<typeof Sheet>

export function ProgressSheet({
  progress: { sessions },
  isLastSession,
  ...props
}: Props) {
  const router = useRouter()

  function handleOpenChange(open: boolean) {
    if (open === false) {
      router.replace('/startup')
    }
  }

  return (
    <Sheet defaultOpen onOpenChange={handleOpenChange} {...props}>
      <SheetContent className="w-full sm:w-3/4">
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
        <div className="gap-4 grid">
          <Accordion type="multiple" defaultValue={[String(sessions.length - 1)]}>
            {sessions.map(
              (
                {
                  id,
                  assessmentStatus,
                  trainingBreathinessStatus,
                  trainingRoughnessStatus,
                },
                index,
              ) => (
                <AccordionItem key={id} value={String(index)}>
                  <AccordionTrigger>Sessão {index + 1}</AccordionTrigger>
                  <AccordionContent className="gap-2 grid">
                    {assessmentStatus !== 'NOT_NEEDED' && (
                      <div className="flex justify-between">
                        <div>
                          <TypographyLarge className="font-bold text-lg">
                            Avaliação
                          </TypographyLarge>
                          <p className="text-violet-500">
                            Status: {status[assessmentStatus]}
                          </p>
                        </div>
                        {assessmentStatus === 'READY' && (
                          <Button
                            className="flex-shrink-0"
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              router.replace(
                                `/startup/instructions/overview/assessment?session=${index + 1}`,
                              )
                            }
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    )}
                    <React.Fragment>
                      <div className="flex justify-between">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-bold text-lg">
                              Treinamento - Rugosidade
                            </h3>
                            {['DONE', 'NOT_NEEDED'].includes(assessmentStatus) ? (
                              <p className="text-violet-500">
                                Status: {status[trainingRoughnessStatus]}
                              </p>
                            ) : (
                              <p className="text-destructive">
                                Status: Aguardando o término da avaliação
                              </p>
                            )}
                          </div>
                        </div>
                        {trainingRoughnessStatus === 'READY' && (
                          <Button
                            className="flex-shrink-0"
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const feature = isLastSession ? 'both' : 'roughness'
                              router.replace(
                                `/startup/instructions/overview/training?feature=${feature}&session=${index + 1}`,
                              )
                            }}
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-bold text-lg">Treinamento - Soprosidade</h3>
                          {['DONE', 'NOT_NEEDED'].includes(assessmentStatus) ? (
                            <p className="text-violet-500">
                              Status: {status[trainingBreathinessStatus]}
                            </p>
                          ) : (
                            <p className="text-destructive">
                              Status: Aguardando o término da avaliação
                            </p>
                          )}
                        </div>
                        {trainingBreathinessStatus === 'READY' && (
                          <Button
                            className="flex-shrink-0"
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const feature = isLastSession ? 'both' : 'breathiness'
                              router.replace(
                                `/startup/instructions/overview/training?feature=${feature}&session=${index + 1}`,
                              )
                            }}
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </React.Fragment>
                  </AccordionContent>
                </AccordionItem>
              ),
            )}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  )
}
