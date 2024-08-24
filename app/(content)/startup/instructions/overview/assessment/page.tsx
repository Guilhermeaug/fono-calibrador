import { TypographyH1, TypographyP } from '@/components/typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = {
  searchParams: {
    [key: string]: string
  }
}

export default function OverviewAssessment({ searchParams }: Props) {
  return (
    <main className="mx-auto max-w-[850px] p-8 space-y-4 text-justify">
      <TypographyH1 className="text-center">Avaliação</TypographyH1>
      <TypographyP>Essa sessão inicia com a Avaliação de 20 vozes.</TypographyP>
      <ul className="list-disc">
        <li>
          Para cada voz avaliada há duas retas, uma para avaliar a Rugosidade (R) e outra
          para Soprosidade (B).
        </li>
        <li>
          Arraste o cursor na barra de rolagem até o ponto equivalente ao grau de desvio
          para o parâmetro avaliado.
        </li>
        <li>
          O ponto inicial da reta, à esquerda, corresponde ao valor 0, sem desvio; e o
          ponto final à direita da reta corresponde ao valor 100, máximo de desvio.
        </li>
        <li>Escute cada voz quantas vezes julgar necessário antes de classificá-la.</li>
        <li>
          Na etapa de Avaliação não serão apresentados conceitos ou fornecidas vozes
          referências, devendo ser realizada a avaliação com base no conhecimento prévio
          ou mesmo sem este conhecimento inicial, caso não possua qualquer experiência
          neste tipo de avaliação.
        </li>
      </ul>
      <div className="h-[8px]" />
      <div className="grid place-content-center">
        <Button asChild className="mx-auto" size="lg">
          <Link
            className="uppercase"
            href={{
              pathname: '/startup/instructions/equipment-check',
              query: {
                ...searchParams,
                step: 'assessment',
              },
            }}
          >
            Iniciar
          </Link>
        </Button>
      </div>
      <div className="h-[30px]" />
    </main>
  )
}
