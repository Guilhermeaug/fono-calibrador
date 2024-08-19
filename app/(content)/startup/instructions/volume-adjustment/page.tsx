import { TypographyH1, TypographyP } from '@/components/typography'
import { Suspense } from 'react'
import { AdjustmentForm } from './components/adjustment-form'

export default function VolumeAdjustmentPage() {
  return (
    <main className="mx-auto max-w-[850px] px-8 pt-16">
      <TypographyH1 className="text-center">
        Ajuste do volume do fone de ouvido
      </TypographyH1>
      <TypographyP>
        Ajuste o volume do seu computador até que reconheça corretamente o som que aparece
        ao fundo da voz. Após responder corretamente e ser liberado dessa etapa, não faça
        alterações no volume.
      </TypographyP>
      <TypographyP>Qual som você escutou ao fundo?</TypographyP>
      <div className="h-[30px]" />
      <Suspense>
        <AdjustmentForm />
      </Suspense>
    </main>
  )
}
