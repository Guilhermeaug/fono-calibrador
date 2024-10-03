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
import { setFavoriteFeatureAction } from '../set-favorite-feature-action'

type Props = {
  progress: UserProgress
}

export function TrainingSelectionModal({
  progress: { id, sessions, favoriteFeature },
}: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const lastSessionIndex = sessions.length
  const isLastSession = searchParams.get('isLastSession') === 'true'

  const text = {
    lastSession:
      'Você está na última sessão e precisa realizar ambos os treinamentos simultaneamente.',
    firstSession:
      'Você deve escolher um dos tipos para realizar agora. O outro ficará disponível em 24 horas e deve ser entregue em até 48 horas.',
    default:
      'Complete o treinamento a seguir. O outro ficará disponível em 24 horas e deve ser entregue em até 48 horas.',
  }
  const displayText = isLastSession
    ? text.lastSession
    : lastSessionIndex === 1
      ? text.firstSession
      : text.default

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="h-[300px] w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Seleção de treinamento</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            {displayText}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex w-full justify-center gap-4">
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
                {favoriteFeature === null && (
                  <>
                    <Button
                      onClick={async () => {
                        await setFavoriteFeatureAction(id, 'roughness')
                        router.push(
                          `/startup/instructions/overview/training?session=${lastSessionIndex}&feature=roughness`,
                        )
                      }}
                    >
                      Rugosidade
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setFavoriteFeatureAction(id, 'breathiness')
                        router.push(
                          `/startup/instructions/overview/training?session=${lastSessionIndex}&feature=breathiness`,
                        )
                      }}
                    >
                      Soprosidade
                    </Button>
                  </>
                )}
                {favoriteFeature === 'roughness' && (
                  <Button
                    onClick={() =>
                      router.push(
                        `/startup/instructions/overview/training?session=${lastSessionIndex}&feature=roughness`,
                      )
                    }
                  >
                    Rugosidade
                  </Button>
                )}
                {favoriteFeature === 'breathiness' && (
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
                )}
              </React.Fragment>
            )}
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
