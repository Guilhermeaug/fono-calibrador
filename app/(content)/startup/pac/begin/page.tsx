import { TypographyH1, TypographyP } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { AUTH } from '@/server/auth'
import { isNil } from 'lodash'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function PacBeginPage() {
  const userInfo = await AUTH.getCurrentUser()
  if (!userInfo) {
    redirect('/login')
  }

  let { pacLink, firstPacStatus, finalPacStatus } = userInfo
  if (!pacLink) {
    pacLink = 'https://www.audbility.com.br/'
  }

  const startPac = pacLink ? pacLink : '#'

  const needsToAcceptTerms = firstPacStatus !== 'DONE' || finalPacStatus !== 'DONE'

  return (
    <main className="mx-auto max-w-[850px] p-8">
      <TypographyH1 className="text-center">
        Teste do Processamento Auditivo (PAC)
      </TypographyH1>
      <TypographyP>
        Antes de iniciar o treinamento perceptivo-auditivo, realize a Triagem do
        Processamento Auditivo (PAC). Para realizá-lo, basta clicar no botão INICIAR PAC
        abaixo. Você será direcionado ao site AudBility, onde realizará o teste.{' '}
        <span className="font-semibold uppercase">
          Se o teste ainda não estiver disponível, aguarde a liberação. Isso será feito em
          até 24 horas após o seu cadastro.
        </span>{' '}
        Após finalizar a Triagem do Processamento Auditivo, é preciso que você retorne
        nessa página, clique no botão o Termo de Conclusão PAC e concorde com o termo para
        que, em seguida, tenha acesso ao treinamento.
      </TypographyP>
      <TypographyP>
        Após finalizar o treinamento perceptivo-auditivo, você também precisará realizar o
        PAC novamente e concordar com o Termo de Conclusão PAC, para que seja possível
        comparar os resultados.
      </TypographyP>
      <TypographyP className="font-bold">
        Importante: após realizar o teste, é necessário retornar nesta página e assinar
        virtualmente o Termo de Conclusão do PAC
      </TypographyP>
      <div className="mx-auto flex flex-col justify-center gap-4 py-8 uppercase md:flex-row">
        <Button disabled={isNil(pacLink)} asChild={!isNil(pacLink)}>
          <Link href={startPac} target="_blank">
            Iniciar pac
          </Link>
        </Button>
        {pacLink && needsToAcceptTerms && (
          <Button asChild>
            <Link href="end">Termo de Conclusão PAC</Link>
          </Button>
        )}
      </div>
    </main>
  )
}
