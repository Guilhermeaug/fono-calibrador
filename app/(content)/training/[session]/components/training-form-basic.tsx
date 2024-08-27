'use client'

import { VoiceSlider } from '@/components/VoiceSlider'
import { TypographyP } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { useAnimatedPlayer } from '@/hooks/use-animated-player'
import { useElapsedTime } from '@/hooks/use-elapsed-time'
import { STRAPI, STRAPI_URL } from '@/server/strapi'
import { Audio } from '@/server/types'
import { TraningEvaluationDataOneFeature } from '@/types'
import dayjs from 'dayjs'
import { ArrowRight } from 'lucide-react'
import { Session } from 'next-auth'
import * as React from 'react'
import { toast } from 'sonner'
import useSound from 'use-sound'
import { options } from '../constants'

type Props = {
  audios: Audio[]
  feature: 'roughness' | 'breathiness'
  userSession: Session
  sessionNumber: number
}

export function TrainingFormBasic({
  audios,
  feature,
  userSession,
  sessionNumber,
}: Props) {
  const {
    user: { jwt },
  } = userSession
  const startDate = React.useRef(dayjs().toISOString())
  const { elapsedTime, startTimer, resetTimer } = useElapsedTime()
  const [data, setData] = React.useState<TraningEvaluationDataOneFeature[]>(
    audios.map((voice) => ({
      identifier: voice.identifier,
      duration: 0,
      numberOfAttempts: 0,
      numberOfAudioClicks: 0,
      value: 0,
    })),
  )
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [value, setValue] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)

  const voice = audios[currentIndex]
  const currentEvaluation = data[currentIndex]

  const url = `${STRAPI_URL}${voice.file.url}`
  const [play, { stop }] = useSound(url, {
    interrupt: true,
    onend: () => {
      stopAnimation()
    },
  })

  const {
    View,
    stopAnimation,
    clickedTimes: audioClickedTimes,
    resetClickedTimes,
  } = useAnimatedPlayer({
    play,
  })

  function saveTraining() {
    const newData = [...data]
    newData[currentIndex] = {
      ...currentEvaluation,
      duration: currentEvaluation.duration + elapsedTime,
      numberOfAttempts: currentEvaluation.numberOfAttempts + 1,
      numberOfAudioClicks: currentEvaluation.numberOfAudioClicks + audioClickedTimes,
      value,
    }
    setData(newData)
  }

  async function handleNext() {
    stop()
    stopAnimation()
    saveTraining()

    setIsLoading(true)
    const isCorrect = await STRAPI.checkAnswer({
      programId: 1,
      fileIdentifier: voice.identifier,
      answer: value,
      feature,
      session: sessionNumber,
    }).catch(() => setIsLoading(false))
    setIsLoading(false)

    if (isCorrect === true) {
      toast.success('Resposta correta! Prossiga.')
      if (currentIndex + 1 < data.length) {
        setCurrentIndex((prev) => prev + 1)
      } else {
        const endDate = dayjs().toISOString()
        await STRAPI.submitTraining({
          programId: 1,
          feature,
          startDate: startDate.current,
          endDate,
          jwt,
          audios: data,
        })

        toast.success('Treinamento finalizado! Retornando para a tela principal.')
        setTimeout(() => {
          window.location.href = '/startup'
        }, 2000)
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
  }, [currentEvaluation.value, currentIndex, resetClickedTimes, resetTimer, startTimer])

  const isNextDisabled = currentIndex === data.length - 1

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
