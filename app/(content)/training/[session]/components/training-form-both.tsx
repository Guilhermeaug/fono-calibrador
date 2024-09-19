'use client'

import { VoiceSlider } from '@/components/VoiceSlider'
import { TypographyP } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { useAnimatedPlayer } from '@/hooks/use-animated-player'
import { useElapsedTime } from '@/hooks/use-elapsed-time'
import { STRAPI, STRAPI_URL } from '@/server/strapi'
import { Audio } from '@/server/types'
import { TraningEvaluationDataBothFeatures } from '@/types'
import dayjs from 'dayjs'
import { ArrowRight } from 'lucide-react'
import { Session } from 'next-auth'
import * as React from 'react'
import { toast } from 'sonner'
import useSound from 'use-sound'
import { options } from '../constants'

type Props = {
  audios: Audio[]
  feature: 'both'
  userSession: Session
  sessionNumber: number
}

export function TrainingFormBoth({ audios, feature, userSession, sessionNumber }: Props) {
  const {
    user: { jwt },
  } = userSession
  const startDate = React.useRef(dayjs().toISOString())
  const { elapsedTime, startTimer, resetTimer } = useElapsedTime()
  const [data, setData] = React.useState<TraningEvaluationDataBothFeatures[]>(
    audios.map((voice) => ({
      identifier: voice.identifier,
      duration: 0,
      numberOfAttempts: 0,
      numberOfAudioClicks: 0,
      roughness: 0,
      breathiness: 0,
    })),
  )
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [roughness, setRoughness] = React.useState(0)
  const [breathiness, setBreathiness] = React.useState(0)
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
      roughness,
      breathiness,
    }
    setData(newData)
  }

  async function handleNext() {
    stop()
    stopAnimation()
    saveTraining()

    setIsLoading(true)
    const isCorrectRoughness = await STRAPI.checkAnswer({
      programId: 1,
      fileIdentifier: voice.identifier,
      answer: roughness,
      feature: 'roughness',
      session: sessionNumber,
    }).catch(() => setIsLoading(false))
    if (isCorrectRoughness === false) {
      setIsLoading(false)
      toast.error(
        'Resposta de rugosidade incorreta! Escute as âncoras e tente novamente.',
      )
      return
    }

    const isCorrectBreathiness = await STRAPI.checkAnswer({
      programId: 1,
      fileIdentifier: voice.identifier,
      answer: breathiness,
      feature: 'breathiness',
      session: sessionNumber,
    }).catch(() => setIsLoading(false))
    if (isCorrectBreathiness === false) {
      setIsLoading(false)
      toast.error(
        'Resposta de soprosidade incorreta! Escute as âncoras e tente novamente.',
      )
      return
    }
    setIsLoading(false)

    toast.success('Resposta correta! Prossiga.')

    if (currentIndex + 1 < data.length) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      const endDate = dayjs().toISOString()
      await STRAPI.submitTraining({
        programId: 1,
        feature: 'roughness',
        startDate: startDate.current,
        endDate,
        jwt,
        audios: data.map(({ breathiness, roughness, ...rest }) => ({
          ...rest,
          value: roughness,
        })),
      })
      await STRAPI.submitTraining({
        programId: 1,
        feature: 'breathiness',
        startDate: startDate.current,
        endDate,
        jwt,
        audios: data.map(({ breathiness, roughness, ...rest }) => ({
          ...rest,
          value: breathiness,
        })),
      })
      toast.success('Programa finalizado! Retornando para a tela principal.')
      setTimeout(() => {
        window.location.href = '/startup'
      }, 2000)
    }
  }

  React.useEffect(() => {
    startTimer()
    setRoughness(currentEvaluation.roughness)
    setBreathiness(currentEvaluation.breathiness)

    return () => {
      resetTimer()
      resetClickedTimes()
    }
  }, [
    currentEvaluation.breathiness,
    currentEvaluation.roughness,
    currentIndex,
    resetClickedTimes,
    resetTimer,
    startTimer,
  ])

  const isNextDisabled = currentIndex === data.length - 1

  const sliders = [
    { label: 'Rugosidade', value: roughness, setValue: setRoughness },
    { label: 'Soprosidade', value: breathiness, setValue: setBreathiness },
  ]

  return (
    <section className="space-y-4">
      <TypographyP>Rugosidade e Soprosidade</TypographyP>
      <TypographyP>{options.breathiness.title}</TypographyP>
      <TypographyP>{options.roughness.title}</TypographyP>
      <div className="flex items-center gap-4">
        <TypographyP>Voz {currentIndex + 1}:</TypographyP>
        {View}
      </div>
      <div className="grid gap-8">
        {sliders.map((slider, index) => (
          <div key={index} className="flex flex-col items-center gap-6 md:flex-row">
            <span className="w-24 text-center text-sm leading-none md:mt-4 md:text-start">
              {slider.label}
            </span>
            <VoiceSlider
              value={[slider.value]}
              onValueChange={(value) => slider.setValue(value[0])}
            />
          </div>
        ))}
      </div>
      <div className="h-[12px]" />
      <div className="mx-auto flex justify-center gap-4">
        <Button size="lg" disabled={isLoading} onClick={handleNext}>
          {isNextDisabled ? (
            'Enviar treinamento e voltar para tela principal'
          ) : (
            <>
              Próxima <ArrowRight className="ml-2 h-4 w-4" />{' '}
            </>
          )}
        </Button>
      </div>
    </section>
  )
}
