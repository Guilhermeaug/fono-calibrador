'use client'

import { TypographyP } from '@/components/typography'
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
import { VoiceSlider } from '@/components/VoiceSlider'
import { useAnimatedPlayer } from '@/hooks/use-animated-player'
import useElapsedTime from '@/hooks/use-elapsed-time'
import { STRAPI_URL } from '@/server/strapi'
import { ProgramAssessment } from '@/server/types'
import { AssessmentEvaluationData } from '@/types'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import * as React from 'react'
import useSound from 'use-sound'

type Props = {
  program: ProgramAssessment
}

export function AsssessmentForm({ program: { assessment } }: Props) {
  const { elapsedTime, startTimer, resetTimer } = useElapsedTime()
  const [evaluations, setEvaluations] = React.useState<AssessmentEvaluationData[]>(
    assessment.map((voice) => ({
      identifier: voice.identifier,
      duration: 0,
      numberOfAttempts: 0,
      roughness: 0,
      breathiness: 0,
    })),
  )

  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [roughness, setRoughness] = React.useState(0)
  const [breathiness, setBreathiness] = React.useState(0)

  const voice = assessment[currentIndex]
  const currentEvaluation = evaluations[currentIndex]

  const url = `${STRAPI_URL}${voice.file.url}`
  const [play, { stop }] = useSound(url, {
    interrupt: true,
    onend: () => {
      stopAnimation()
    },
  })

  const { View, stopAnimation, clickedTimes, resetClickedTimes } = useAnimatedPlayer({ play })

  function stopVoiceAndAnimation() {
    stop()
    stopAnimation()
  }

  function saveEvaluation() {
    const newEvaluations = [...evaluations]
    newEvaluations[currentIndex] = {
      ...currentEvaluation,
      duration: currentEvaluation.duration + elapsedTime,
      numberOfAttempts: currentEvaluation.numberOfAttempts + clickedTimes,
      roughness,
      breathiness,
    }
    setEvaluations(newEvaluations)
  }

  function handlePrevious() {
    stopVoiceAndAnimation()

    if (currentIndex - 1 >= 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  function handleNext() {
    stopVoiceAndAnimation()

    saveEvaluation()

    if (currentIndex + 1 < assessment.length) {
      setCurrentIndex((prev) => prev + 1)
      return
    }
  }

  function endAssessment() {
    saveEvaluation()
  }

  React.useEffect(() => {
    startTimer()
    setRoughness(currentEvaluation.roughness)
    setBreathiness(currentEvaluation.breathiness)

    return () => {
      resetTimer()
      resetClickedTimes()
    }
  }, [currentIndex])

  const isPreviousDisabled = currentIndex === 0
  const isNextDisabled = currentIndex === assessment.length - 1

  return (
    <section>
      <div className="flex items-center gap-4">
        <TypographyP>Voz {currentIndex + 1}:</TypographyP>
        {View}
      </div>
      <div className="h-[30px]" />
      <div className="grid gap-8">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <span className="w-24 text-center text-sm leading-none md:mt-4 md:text-start">
            Rugosidade
          </span>
          <VoiceSlider value={[roughness]} onValueChange={(value) => setRoughness(value[0])} />
        </div>
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <span className="w-24 text-center text-sm leading-none md:mt-4 md:text-start">
            Soprosidade
          </span>
          <VoiceSlider value={[breathiness]} onValueChange={(value) => setBreathiness(value[0])} />
        </div>
      </div>
      <div className="h-[50px]" />
      <div className="mx-auto flex justify-center gap-4">
        <Button size="lg" disabled={isPreviousDisabled} onClick={handlePrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
        </Button>
        {isNextDisabled ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="lg">Finalizar avaliação</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Deseja enviar a avaliação?</AlertDialogTitle>
                <AlertDialogDescription>
                  Ao clicar em continuar, você não poderá alterar as respostas.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={endAssessment}>Continuar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button size="lg" onClick={handleNext}>
            Próxima <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </section>
  )
}
