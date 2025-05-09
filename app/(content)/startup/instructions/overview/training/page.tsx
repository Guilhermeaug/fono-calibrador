import { TypographyH1, TypographyP } from '@/components/typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = {
  searchParams: {
    [key: string]: string
  }
}

export default function OverviewTraining({ searchParams }: Props) {
  return (
    <main className="mx-auto max-w-[850px] space-y-4 p-4 text-justify lg:p-8 xl:p-16">
      <TypographyH1 className="text-center">Treinamento</TypographyH1>
      <TypographyP>
        O treinamento será realizado por meio da avaliação de 20 vozes.
      </TypographyP>
      <ul className="list-disc pl-4">
        <li>
          Em cada sessão os parâmetros rugosidade e soprosidade devem ser treinados, com
          intervalo de 1 dia entre os treinamentos de cada parâmetro. Ou seja, se hoje
          você realizar o treinamento do parâmetro Rugosidade, após 24h (respeitando o
          intervalo de no mínimo 24h e no máximo 48h) você deverá realizar o treinamento
          do parâmetro Soprosidade.
        </li>
        <li>Você deve:</li>
        <ul className="pl-4 list-square">
          <li>Escutar a voz a ser avaliada</li>
          <li>Escutar as vozes referências no quadro ao lado</li>
          <li>
            Escutar novamente a voz a ser avaliada. OBS: repita este processo para escutar
            as vozes quantas vezes julgar necessário para classificá-la.
          </li>
          <li>
            Arraste o cursor na barra de rolagem até o ponto equivalente ao grau de desvio
            para o parâmetro avaliado.
          </li>
          <li>
            O ponto inicial da reta, à esquerda, corresponde ao valor 0, sem desvio; e o
            ponto final á direita da reta corresponde ao valor 100, máximo de desvio.
          </li>
        </ul>
      </ul>
      <div className="h-[8px]" />
      <div className="grid md:place-content-center">
        <Button asChild className="mx-auto w-full md:w-auto" size="lg">
          <Link
            className="uppercase"
            href={{
              pathname: '/startup/instructions/equipment-check',
              query: {
                ...searchParams,
                step: 'training',
              },
            }}
          >
            Iniciar
          </Link>
        </Button>
      </div>
    </main>
  )
}
