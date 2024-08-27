import { TypographyH1, TypographyP } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { AUTH } from '@/server/auth'
import { isNull } from 'lodash'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function PacBeginPage() {
  const userInfo = await AUTH.getCurrentUser()
  if (!userInfo) {
    redirect('/login')
  }

  const { pacLink } = userInfo
  const startPac = pacLink ? pacLink : '#'

  console.log(pacLink)

  return (
    <main className="mx-auto max-w-[850px] p-8">
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
      <div className="mx-auto flex gap-4 py-8">
        <Button
          className="uppercase w-full"
          disabled={isNull(pacLink)}
          asChild={!isNull(pacLink)}
        >
          <Link href={startPac} target="_blank">
            Iniciar pac
          </Link>
        </Button>
        {userInfo.firstPacStatus !== 'DONE' && (
          <Button className="uppercase w-full" asChild>
            <Link href="end">Termo de Conclusão PAC</Link>
          </Button>
        )}
      </div>
    </main>
  )
}
