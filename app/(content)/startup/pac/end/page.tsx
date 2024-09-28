import { TypographyH1, TypographyP } from '@/components/typography'
import { AUTH } from '@/server/auth'
import { redirect } from 'next/navigation'
import { AcceptTerms } from './components/accept-terms'

export default async function PacEndPage() {
  const userInfo = await AUTH.getCurrentUser()
  if (!userInfo) {
    redirect('/login')
  }

  return (
    <main className="mx-auto max-w-[850px] p-8">
      <TypographyH1 className="text-center">
        Teste do Processamento Auditivo (PAC)
      </TypographyH1>
      <TypographyP>
        Eu, declaro ter finalizado por completo o Teste do Processamento Auditivo por meio
        do acesso fornecido, estando apto à prosseguir para a etapa de Treinamento de
        Avaliação Perceptivo-Auditiva da Voz.
      </TypographyP>
      <div className="h-[30px]" />
      <AcceptTerms userInfo={userInfo} />
    </main>
  )
}
