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
import { useElapsedTime } from '@/hooks/use-elapsed-time'
import { STRAPI, STRAPI_URL } from '@/server/strapi'
import { Audio } from '@/server/types'
import { AssessmentEvaluationData } from '@/types'
import dayjs from 'dayjs'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'
import useSound from 'use-sound'

type Props = {
  audios: Audio[]
  userSession: Session
  isLastSession: boolean
}

export function AsssessmentForm({ audios, userSession, isLastSession }: Props) {
  const {
    user: { jwt },
  } = userSession
  const router = useRouter()

  const { elapsedTime, startTimer, resetTimer } = useElapsedTime()
  const startDate = React.useRef(dayjs().toISOString())
  const [data, setData] = React.useState<AssessmentEvaluationData[]>(
    audios.map((voice) => ({
      identifier: voice.identifier,
      duration: 0,
      numberOfAudioClicks: 0,
      roughness: 0,
      breathiness: 0,
    })),
  )

  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [roughness, setRoughness] = React.useState(0)
  const [breathiness, setBreathiness] = React.useState(0)

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

  const checkIfAudioWasListened = () => {
    if (currentEvaluation.numberOfAudioClicks === 0 && audioClickedTimes === 0) {
      toast.error('Você precisa ouvir o áudio antes de continuar.')
      return false
    }
    return true
  }

  function saveEvaluation() {
    const newEvaluations = [...data]
    newEvaluations[currentIndex] = {
      ...currentEvaluation,
      duration: currentEvaluation.duration + elapsedTime,
      numberOfAudioClicks: currentEvaluation.numberOfAudioClicks + audioClickedTimes,
      roughness,
      breathiness,
    }
    setData(newEvaluations)
  }

  function handlePrevious() {
    stop()
    stopAnimation()
    saveEvaluation()

    if (currentIndex - 1 >= 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  function handleNext() {
    const hasListened = checkIfAudioWasListened()
    if (!hasListened) {
      return
    }

    stop()
    stopAnimation()
    saveEvaluation()

    if (currentIndex + 1 < data.length) {
      setCurrentIndex((prev) => prev + 1)
      return
    }
  }

  async function endAssessment() {
    const hasListened = checkIfAudioWasListened()
    if (!hasListened) {
      return
    }

    stop()
    stopAnimation()
    saveEvaluation()

    const endDate = dayjs().toISOString()
    await STRAPI.submitAssessment({
      programId: 1,
      startDate: startDate.current,
      endDate,
      jwt,
      audios: data,
    })
    router.replace(`/startup?show=training-selection&isLastSession=${isLastSession}`)
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

  const isPreviousDisabled = currentIndex === 0
  const isNextDisabled = currentIndex === data.length - 1

  const sliders = [
    { label: 'Rugosidade', value: roughness, setValue: setRoughness },
    { label: 'Soprosidade', value: breathiness, setValue: setBreathiness },
  ]

  return (
    <section>
      <div className="flex items-center gap-4">
        <TypographyP>Voz {currentIndex + 1}:</TypographyP>
        {View}
      </div>
      <div className="h-[30px]" />
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
