'use client'

import { VoiceForm } from '@/components/voices-form/form'
import { translateFeature } from '@/lib/utils'
import { STRAPI } from '@/server/strapi'
import { ProgramTraining } from '@/server/types'
import { VoiceFormData } from '@/types'
import dayjs from 'dayjs'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'

type Props = {
  isOneFeature: boolean
  userSession: Session
  program: ProgramTraining
  feature: 'roughness' | 'breathiness' | 'both'
  sessionNumber: number
}

export function TrainingForm({
  program,
  isOneFeature,
  feature,
  sessionNumber,
  userSession,
}: Props) {
  const {
    user: { jwt },
  } = userSession
  const router = useRouter()
  const startDate = React.useRef(dayjs().toISOString())

  const features = isOneFeature ? [feature] : ['roughness', 'breathiness']

  async function onNextVoice(current: VoiceFormData): Promise<boolean> {
    try {
      const validations = await Promise.all(
        features.map(async (feature) => {
          const isCorrect = await STRAPI.checkAnswer({
            programId: program.id,
            fileIdentifier: current.identifier,
            answer: current.data.find((d) => d.feature === feature)?.value!,
            feature: feature as 'roughness' | 'breathiness',
            session: sessionNumber,
          })
          return { feature, isCorrect }
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
          await STRAPI.submitTraining({
            programId: program.id,
            feature: feature as 'roughness' | 'breathiness',
            startDate: startDate.current,
            endDate,
            jwt,
            audios,
          })
        }),
      )
      toast.success('Treinamento finalizado! Retornando para a tela principal.')
      setTimeout(() => {
        router.refresh()
        router.push('/startup')
      }, 2000)
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

