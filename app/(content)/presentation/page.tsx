import { BackButton } from '@/components/back-button'
import { TypographyH1, TypographyH4, TypographyP } from '@/components/typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PresentationPage() {
  return (
    <main className="mx-auto max-w-[850px] p-4 lg:p-8 xl:p-16">
      <TypographyH1 className="text-center">
        Seja bem vindo ao Calibrador Auditivo!
      </TypographyH1>
      <TypographyP>
        O <b>Calibrador Auditivo</b> foi desenvolvido por pesquisadores do Programa de
        Pós-Graduação em Ciências Fonoaudiológicas da UFMG, no projeto de pesquisa de
        mestrado e doutorado intitulado{' '}
        <b>
          {' '}
          Instrumentos de treinamento e avaliação perceptivo-auditiva da voz: construção e
          validação
        </b>
        , aprovado pelo <b>COEP sob número 4.812.704.</b> Trata-se de um instrumento de
        treinamento em Avaliação Perceptivo-Auditiva da Voz.
      </TypographyP>
      <TypographyH4>Quem pode usá-lo?</TypographyH4>
      <TypographyP>
        O <b>Calibrador Auditivo</b> é direcionado tanto para o treinamento de alunos de
        Fonoaudiologia, quanto para a calibração de Fonoaudiólogos já formados.
      </TypographyP>
      <TypographyH4>Como funciona?</TypographyH4>
      <TypographyP>
        O treinamento pelo <b>Calibrador Auditivo</b> é composto por 6 sessões com duração
        aproximada de 20 minutos cada, com intervalo de uma semana entre elas.
      </TypographyP>
      <TypographyP>
        Em cada sessão deverá realizar-se um treinamento para Rugosidade (R) e outro para
        Soprosidade (B), com intervalo de um dia entre o treino de cada parâmetro. Na
        sexta sessão os dois parâmetros serão treinados concomitantemente.
      </TypographyP>
      <TypographyP>
        Em alguns momentos do treinamento – antes da primeira sessão e depois da terceira
        e da sexta sessão – o usuário fará avaliação de algumas vozes, com duração
        aproximada de 20 minutos. A partir dessa avaliação serão gerados gráficos com a
        curva de aprendizado para que o usuário acompanhe com precisão este processo.
      </TypographyP>
      <TypographyH4>Está preparado?</TypographyH4>
      <div className="flex justify-center gap-4 py-8">
        <BackButton variant="secondary" className="w-full">
          Voltar
        </BackButton>
        <Button className="w-full" asChild>
          <Link href="/reasoning">Continuar</Link>
        </Button>
      </div>
    </main>
  )
}
