'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { UserProgress } from '@/server/types'
import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'

type Props = {
  progress: UserProgress
}

export function TrainingSelectionModal({ progress: { sessions } }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [open] = React.useState(true)

  const lastSessionIndex = sessions.length
  const isLastSession = searchParams.get('isLastSession') === 'true'

  const text = isLastSession
    ? 'Você está na última sessão e precisa realizar ambos os treinamentos simultaneamente.'
    : ' Você deve escolher um dos tipos para realizar agora. O outro ficará disponível em 24 horas e deve ser entregue em até 48 horas.'

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="w-[400px] h-[300px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Escolha qual treinamento deseja fazer primeiro
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">{text}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-center gap-4 w-full">
            {isLastSession ? (
              <Button
                onClick={() =>
                  router.push(
                    `/startup/instructions/overview/training?session=${lastSessionIndex}&feature=both`,
                  )
                }
              >
                Realizar ambos os treinamentos
              </Button>
            ) : (
              <React.Fragment>
                <Button
                  onClick={() =>
                    router.push(
                      `/startup/instructions/overview/training?session=${lastSessionIndex}&feature=roughness`,
                    )
                  }
                >
                  Rugosidade
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    router.push(
                      `/startup/instructions/overview/training?session=${lastSessionIndex}&feature=breathiness`,
                    )
                  }
                >
                  Soprosidade
                </Button>
              </React.Fragment>
            )}
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
