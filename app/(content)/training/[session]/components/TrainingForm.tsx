'use client'

import { VoiceSlider } from '@/components/VoiceSlider'
import { TypographyP } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { useAnimatedPlayer } from '@/hooks/use-animated-player'
import useElapsedTime from '@/hooks/use-elapsed-time'
import { STRAPI, STRAPI_URL } from '@/server/strapi'
import { ProgramTraining } from '@/server/types'
import { TraningEvaluationData } from '@/types'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'
import useSound from 'use-sound'
import { options } from '../constants'

type Props = {
  program: ProgramTraining
  feature: 'roughness' | 'breathiness'
  session: number
}

export function TrainingForm({ program: { id, training }, feature, session }: Props) {
  const router = useRouter()

  const { elapsedTime, startTimer, resetTimer } = useElapsedTime()
  const [evaluations, setEvaluations] = React.useState<TraningEvaluationData[]>(
    training.map((voice) => ({
      identifier: voice.identifier,
      duration: 0,
      numberOfAttempts: 0,
      value: 0,
    })),
  )

  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [value, setValue] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)

  const voice = training[currentIndex]
  const currentEvaluation = evaluations[currentIndex]

  const url = `${STRAPI_URL}${voice.file.url}`
  const [play, { stop }] = useSound(url, {
    interrupt: true,
    onend: () => {
      stopAnimation()
    },
  })

  const { View, stopAnimation, clickedTimes, resetClickedTimes } = useAnimatedPlayer({
    play,
  })

  function saveTraining() {
    const newEvaluations = [...evaluations]
    newEvaluations[currentIndex] = {
      ...currentEvaluation,
      duration: currentEvaluation.duration + elapsedTime,
      numberOfAttempts: currentEvaluation.numberOfAttempts + clickedTimes,
      value,
    }
    setEvaluations(newEvaluations)
  }

  async function handleNext() {
    saveTraining()

    setIsLoading(true)
    const isCorrect = await STRAPI.checkAnswer({
      fileIdentifier: voice.identifier,
      answer: value,
      programId: id,
      feature,
      session,
    })
    setIsLoading(false)

    if (isCorrect === true) {
      toast.success('Resposta correta! Prossiga.')
      if (currentIndex + 1 < training.length) {
        setCurrentIndex((prev) => prev + 1)
      } else {
        toast.success('Treinamento finalizado! Retornando para a tela principal.')
        router.push('/')
      }
    } else {
      toast.error('Resposta incorreta! Escute as âncoras e tente novamente.')
    }
  }

  React.useEffect(() => {
    startTimer()
    setValue(currentEvaluation.value)

    return () => {
      resetTimer()
      resetClickedTimes()
    }
  }, [currentIndex])

  const isNextDisabled = currentIndex === training.length - 1

  return (
    <section className="space-y-4">
      <TypographyP>{options[feature].title}</TypographyP>
      <div className="flex items-center gap-4">
        <TypographyP>Voz {currentIndex + 1}:</TypographyP>
        {View}
      </div>
      <div className="gap-8 grid">
        <div className="flex md:flex-row flex-col items-center gap-6">
          <span className="md:mt-4 w-24 text-center text-sm md:text-start leading-none">
            {options[feature].name}
          </span>
          <VoiceSlider value={[value]} onValueChange={(value) => setValue(value[0])} />
        </div>
      </div>
      <div className="h-[12px]" />
      <div className="flex justify-center gap-4 mx-auto">
        <Button size="lg" disabled={isLoading} onClick={handleNext}>
          {isNextDisabled ? (
            'Enviar treinamento e voltar para tela principal'
          ) : (
            <>
              Próxima <ArrowRight className="ml-2 w-4 h-4" />{' '}
            </>
          )}
        </Button>
      </div>
    </section>
  )
}
