'use client'

import { useAnimatedPlayer } from '@/hooks/use-animated-player'
import { useElapsedTime } from '@/hooks/use-elapsed-time'
import { STRAPI_URL } from '@/server/strapi'
import { Audio } from '@/server/types'
import { VoiceFormData } from '@/types'
import dayjs from 'dayjs'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import * as React from 'react'
import { toast } from 'sonner'
import useSound from 'use-sound'
import { TypographyP } from '../typography'
import { Button } from '../ui/button'
import { VoiceSlider } from '../VoiceSlider'
import { options } from './constants'
import { initializeData } from './helpers'

type Props = {
  features: ('roughness' | 'breathiness')[]
  audios: Audio[]
  enableBackButton?: boolean
  isAssessment?: boolean
  endText: string
  onNext?: (current: VoiceFormData) => Promise<boolean>
  onSubmit: (data: VoiceFormData[]) => Promise<void>
}

export function VoiceForm({
  features,
  audios,
  onSubmit,
  endText,
  onNext = () => Promise.resolve(true),
  enableBackButton = false,
  isAssessment = false,
}: Props) {
  const { elapsedTime, startTimer, resetTimer } = useElapsedTime()
  const [data, setData] = React.useState<VoiceFormData[]>(
    initializeData(features, audios),
  )
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)

  const voice = audios.find(
    (audio) => audio.identifier === data[currentIndex].identifier,
  )!
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

  function checkIfAudioWasListened() {
    if (currentEvaluation.numberOfAudioClicks === 0 && audioClickedTimes === 0) {
      toast.error('Você precisa ouvir o áudio pelo menos uma vez.')
      return false
    }
    return true
  }

  function save() {
    const newData = [...data]
    const currentData = newData[currentIndex]
    newData[currentIndex] = {
      ...currentData,
      duration: currentData.duration + elapsedTime,
      numberOfAudioClicks: currentData.numberOfAudioClicks + audioClickedTimes,
      numberOfAttempts: currentData.numberOfAttempts + 1,
    }
    setData(newData)

    const timestamp = dayjs().toISOString()
    localStorage.setItem(
      'voiceFormBackup',
      JSON.stringify({ timestamp, features, backup: newData }),
    )

    return newData
  }

  function resetValues() {
    resetTimer()
    resetClickedTimes()
    stop()
    stopAnimation()
    startTimer()
  }

  function handlePrevious() {
    save()
    resetValues()

    setCurrentIndex((prev) => prev - 1)
  }

  async function handleNext() {
    const hasListened = checkIfAudioWasListened()
    if (!hasListened) {
      return
    }

    const newData = save()

    setIsLoading(true)
    const canProcceed = await onNext(currentEvaluation)
    if (currentIndex + 1 < audios.length) {
      if (canProcceed) {
        resetValues()
        setCurrentIndex((prev) => prev + 1)
      }
    } else {
      if (canProcceed) {
        localStorage.removeItem('voiceFormBackup')
        await onSubmit(newData)
      }
    }
    setIsLoading(false)
  }

  const isPreviousDisabled = currentIndex === 0
  const isNextDisabled = currentIndex === audios.length - 1
  const nextButtonText = isNextDisabled ? endText : 'Próxima'

  const sliders = {
    roughness: {
      label: 'Rugosidade',
      value: currentEvaluation.data.find((d) => d.feature === 'roughness')?.value || 0,
      onValueChange: (value: number) => {
        const newData = [...data]
        const index = newData[currentIndex].data.findIndex(
          (d) => d.feature === 'roughness',
        )
        newData[currentIndex].data[index].value = value
        setData(newData)
      },
    },
    breathiness: {
      label: 'Soprosidade',
      value: currentEvaluation.data.find((d) => d.feature === 'breathiness')?.value || 0,
      onValueChange: (value: number) => {
        const newData = [...data]
        const index = newData[currentIndex].data.findIndex(
          (d) => d.feature === 'breathiness',
        )
        newData[currentIndex].data[index].value = value
        setData(newData)
      },
    },
  }

  return (
    <section className="w-full max-w-[860px] flex-1 space-y-4">
      {!isAssessment &&
        features.map((feature) => (
          <TypographyP key={feature}>
            {options[feature as keyof typeof options].title}
          </TypographyP>
        ))}
      <div className="flex items-center gap-4">
        <TypographyP>Voz {currentIndex + 1}:</TypographyP>
        {View}
      </div>
      <div className="grid gap-8">
        {features.map((feature) => {
          const slider = sliders[feature as keyof typeof sliders]
          return (
            <div key={feature} className="flex flex-col items-center gap-6 md:flex-row">
              <span className="w-24 text-center text-sm leading-none md:mt-4 md:text-start">
                {slider.label}
              </span>
              <VoiceSlider
                value={[slider.value]}
                onValueChange={(value) => slider.onValueChange(value[0])}
              />
            </div>
          )
        })}
      </div>
      <div className="h-[12px]" />
      <div className="mx-auto flex justify-center gap-4">
        {enableBackButton && (
          <Button
            size="lg"
            disabled={isPreviousDisabled || isLoading}
            onClick={handlePrevious}
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" /> Anterior
          </Button>
        )}
        <Button size="lg" disabled={isLoading} onClick={handleNext}>
          {nextButtonText} <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
