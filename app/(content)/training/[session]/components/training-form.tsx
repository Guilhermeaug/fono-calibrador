'use client'

import { VoiceForm } from '@/components/voices-form/form'
import { translateFeature } from '@/lib/utils'
import { ProgramTraining } from '@/server/types'
import { VoiceFormData } from '@/types'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'
import { computeScore } from '../helpers'
import { submitTrainingAction } from '../submit-training-action'

type Props = {
  program: ProgramTraining
  feature: 'roughness' | 'breathiness' | 'both'
  sessionNumber: number
}

export function TrainingForm({ program, feature, sessionNumber }: Props) {
  const router = useRouter()
  const startDate = React.useRef(dayjs().toISOString())

  const features =
    feature !== 'both'
      ? [feature]
      : (['roughness', 'breathiness'] as ('roughness' | 'breathiness')[])

  const currentThreshold = program.sessionsThreshold[sessionNumber - 1]

  async function onNextVoice(current: VoiceFormData): Promise<boolean> {
    try {
      const validations = await Promise.all(
        features.map(async (feature) => {
          const referenceValues = program.training
            .find((f) => f.identifier === current.identifier)!
            [feature].map((v) => Number(v))
          const { result } = computeScore({
            answer: current.data.find((d) => d.feature === feature)?.value!,
            values: referenceValues,
            threshold: currentThreshold,
          })
          return { feature, isCorrect: result }
        }),
      )
      if (validations.every((v) => v.isCorrect)) {
        toast.success('Resposta correta!')
        return true
      }
      const incorrectFeatures = validations
        .filter((v) => !v.isCorrect)
        .map((v) => translateFeature(v.feature))
      const singularMessage = `A resposta para ${incorrectFeatures[0]} está incorreta. Tente novamente.`
      const pluralMessage = `As respostas para ${incorrectFeatures.join(' e ')} estão incorretas. Tente novamente.`
      toast.error(incorrectFeatures.length > 1 ? pluralMessage : singularMessage)
      return false
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async function onSubmitTraining(data: VoiceFormData[]) {
    try {
      const endDate = dayjs().toISOString()
      await Promise.all(
        features.map(async (feature) => {
          const audios = data.map(({ data, ...audio }) => ({
            ...audio,
            value: data.find((d) => d.feature === feature)?.value!,
          }))
          await submitTrainingAction({
            programId: program.id,
            feature: feature as 'roughness' | 'breathiness',
            startDate: startDate.current,
            endDate,
            audios,
          })
        }),
      )
      toast.success('Treinamento finalizado! Retornando para a tela principal.')
      setTimeout(() => {
        router.push('/startup')
      }, 3000)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <VoiceForm
      features={features}
      audios={program.training}
      endText="Terminar treinamento"
      onNext={onNextVoice}
      onSubmit={onSubmitTraining}
    />
  )
}
