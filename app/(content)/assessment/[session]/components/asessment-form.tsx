'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { VoiceForm } from '@/components/voices-form/form'
import { ProgramAssessment } from '@/server/types'
import { VoiceFormData } from '@/types'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'
import { submitAssessmentAction } from '../submit-assessment-action'

type Props = {
  program: ProgramAssessment
  isLastSession: boolean
}

export function AsssessmentForm({ program, isLastSession }: Props) {
  const router = useRouter()

  const startDate = React.useRef(dayjs().toISOString())
  const voiceFormData = React.useRef<VoiceFormData[]>([])

  const [showAlert, setShowAlert] = React.useState(false)

  function handleOpenChange(open: boolean) {
    setShowAlert(open)
  }

  async function onSubmitAssessment(data: VoiceFormData[]) {
    voiceFormData.current = data
    handleOpenChange(true)
  }

  async function submit() {
    const data = voiceFormData.current
    try {
      const endDate = dayjs().toISOString()
      const audios = data.map(({ data, numberOfAttempts, ...audio }) => ({
        ...audio,
        roughness: data.find((d) => d.feature === 'roughness')?.value!,
        breathiness: data.find((d) => d.feature === 'breathiness')?.value!,
      }))
      await submitAssessmentAction({
        programId: program.id,
        startDate: startDate.current,
        endDate,
        audios,
      })

      toast.success('Avaliação finalizada!')
      router.replace(`/startup?show=training-selection&isLastSession=${isLastSession}`)
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <React.Fragment>
      <VoiceForm
        type="assessment"
        features={['roughness', 'breathiness']}
        audios={program.assessment}
        onSubmit={onSubmitAssessment}
      />
      <AlertDialog open={showAlert} onOpenChange={handleOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja enviar a avaliação?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao clicar em continuar, você não poderá alterar as respostas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={submit}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  )
}
