'use client'

import { useElapsedTime } from '@/hooks/use-elapsed-time'
import { STRAPI_URL } from '@/server/strapi'
import { Audio } from '@/server/types'
import { VoiceFormData } from '@/types'
import dayjs from 'dayjs'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import * as React from 'react'
import { toast } from 'sonner'
import { AudioButton } from '../audio-button'
import { Button } from '../ui/button'
import { Slider } from '../ui/slider'
import { initializeData } from './helpers'

type Props = {
  type: 'training' | 'assessment'
  features: ('roughness' | 'breathiness')[]
  audios: Audio[]
  onNext?: (current: VoiceFormData) => Promise<boolean>
  onSubmit: (data: VoiceFormData[]) => Promise<void>
}

export function VoiceForm({
  type,
  features,
  audios,
  onSubmit,
  onNext = () => Promise.resolve(true),
}: Props) {
  const { elapsedTime, startTimer, resetTimer } = useElapsedTime()
  const [audioClickedTimes, setAudioClickedTimes] = React.useState(0)

  const [data, setData] = React.useState<VoiceFormData[]>(
    initializeData(features, audios),
  )
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)

  const currentEvaluation = data[currentIndex]
  const voice = audios.find((audio) => audio.identifier === currentEvaluation.identifier)!
  const audioUrl = `${STRAPI_URL}${voice.file.url}`

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
    startTimer()
    setAudioClickedTimes(0)
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
    resetValues()

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

  function onClickAudioButton() {
    setAudioClickedTimes((prev) => prev + 1)
  }

  const isLastAudio = currentIndex === data.length - 1
  const isPreviousDisabled = currentIndex === 0 || isLoading
  const isNextDisabled = isLoading
  const nextButtonText = isLastAudio ? 'Enviar etapa' : 'Próximo'

  const sliders = {
    roughness: {
      value: [currentEvaluation.data.find((d) => d.feature === 'roughness')?.value || 0],
      onValueChange: (values: number[]) => {
        const newData = [...data]
        const index = newData[currentIndex].data.findIndex(
          (d) => d.feature === 'roughness',
        )
        newData[currentIndex].data[index].value = values[0]
        setData(newData)
      },
    },
    breathiness: {
      value: [
        currentEvaluation.data.find((d) => d.feature === 'breathiness')?.value || 0,
      ],
      onValueChange: (values: number[]) => {
        const newData = [...data]
        const index = newData[currentIndex].data.findIndex(
          (d) => d.feature === 'breathiness',
        )
        newData[currentIndex].data[index].value = values[0]
        setData(newData)
      },
    },
  }

  return (
    <div className="flex flex-col items-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <div className="mb-6 flex flex-col items-center rounded-xl bg-accent p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Voz {currentIndex + 1}</h2>
            <AudioButton
              key={audioUrl}
              src={audioUrl}
              onClick={onClickAudioButton}
              canPause={false}
            />
          </div>
          <div className="space-y-8">
            {features.includes('roughness') && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label htmlFor="roughness-slider" className="text-base font-medium">
                    Rugosidade
                  </label>
                  <span className="text-sm">{sliders.roughness.value}</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 -z-10 h-2 rounded-full bg-gradient-to-r from-blue-400 via-yellow-400 to-red-500"></div>
                  <Slider
                    {...sliders.roughness}
                    id="roughness-slider"
                    min={1}
                    max={100}
                    step={1}
                    className="z-10"
                  />
                  <div className="mt-2 flex justify-between text-xs">
                    <span>1</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            )}
            {features.includes('breathiness') && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label htmlFor="breathiness-slider" className="text-base font-medium">
                    Soprosidade
                  </label>
                  <span className="text-sm">{sliders.breathiness.value}</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 -z-10 h-2 rounded-full bg-gradient-to-r from-blue-400 via-yellow-400 to-red-500"></div>
                  <Slider
                    {...sliders.breathiness}
                    id="breathiness-slider"
                    min={1}
                    max={100}
                    step={1}
                    className="z-10"
                  />
                  <div className="mt-2 flex justify-between text-xs">
                    <span>1</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-10 flex justify-between gap-4">
          {type === 'assessment' && (
            <Button
              onClick={handlePrevious}
              variant="secondary"
              disabled={isPreviousDisabled}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
          )}
          <Button onClick={handleNext} disabled={isNextDisabled} className="flex-1">
            {nextButtonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="mt-6 text-center text-sm">
          Voz {currentIndex + 1} de {data.length}
        </div>
      </div>
    </div>
  )
}
