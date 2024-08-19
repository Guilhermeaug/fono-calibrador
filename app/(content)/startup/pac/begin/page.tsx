import { TypographyH1, TypographyP } from '@/components/typography'
import { AUTH } from '@/server/auth'
import { redirect } from 'next/navigation'
import { Buttons } from './components/Buttons'

export default async function PacBeginPage() {
  const userInfo = await AUTH.getCurrentUser()
  if (!userInfo) {
    redirect('/login')
  }

  const { pacLink } = userInfo
  const startPac = pacLink ? pacLink : '#'

  return (
    <main className="mx-auto max-w-[850px] px-8 pt-16">
      <TypographyH1 className="text-center">
        Teste do Processamento Auditivo (PAC)
      </TypographyH1>
      <TypographyP>
        Antes de iniciar a avaliação das vozes, realize o{' '}
        <b>Teste do Processamento Auditivo (PAC)</b>. Para realizá-lo, basta clicar no
        botão abaixo. Você será direcionado ao site AudBility, onde realizará o teste. Se
        o teste ainda não estiver disponível, aguarde a liberação.
      </TypographyP>
      <TypographyP>
        Após finalizar o programa, você também precisa realizar o PAC novamente para
        comparar os resultados.
      </TypographyP>
      <TypographyP className="font-bold">
        Importante: após realizar o teste, é necessário retornar nesta página e assinar
        virtualmente o Termo de Conclusão do PAC abaixo para prosseguir para a última
        etapa, o Treinamento de Avaliação Perceptivo-Auditiva.
      </TypographyP>
      <Buttons enableStartPack={!Boolean(pacLink)} startPacLink={startPac} />
    </main>
  )
}
