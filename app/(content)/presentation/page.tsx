import { TypographyH1 } from "@/components/typography/h1";
import { TypographyH4 } from "@/components/typography/h4";
import { TypographyMuted } from "@/components/typography/muted";
import { TypographyP } from "@/components/typography/p";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PresentationPage() {
  return (
    <main className="mx-auto max-w-[850px] px-8 pt-28">
      <TypographyH1 className="text-center">
        Seja bem vindo ao Calibrador Auditivo!
      </TypographyH1>
      <TypographyMuted className="mt-1 text-center">
        Última atualização: 12 de setembro de 2021
      </TypographyMuted>
      <TypographyP>
        O <b>Calibrador Auditivo</b> foi desenvolvido por pesquisadores do
        Programa de Pós-Graduação em Ciências Fonoaudiológicas da UFMG, no
        projeto de pesquisa de mestrado e doutorado intitulado{" "}
        <b>
          {" "}
          Instrumentos de treinamento e avaliação perceptivo-auditiva da voz:
          construção e validação
        </b>
        , aprovado pelo <b>COEP sob número 4.812.704.</b> Trata-se de um
        instrumento de treinamento em Avaliação Perceptivo-Auditiva da Voz.
      </TypographyP>
      <TypographyH4>Quem pode usá-lo?</TypographyH4>
      <TypographyP>
        O <b>Calibrador Auditivo</b> é direcionado tanto para o treinamento de
        alunos de Fonoaudiologia, quanto para a calibração de Fonoaudiólogos já
        formados.
      </TypographyP>
      <TypographyH4>Como funciona?</TypographyH4>
      <TypographyP>
        O treinamento pelo <b>Calibrador Auditivo</b> é composto por 6 sessões
        com duração aproximada de 20 minutos cada, com intervalo de uma semana
        entre elas.
      </TypographyP>
      <TypographyP>
        Em cada sessão deverá realizar-se um treinamento para Rugosidade (R) e
        outro para Soprosidade (B), com intervalo de um dia entre o treino de
        cada parâmetro. Na sexta sessão os dois parâmetros serão treinados
        concomitantemente.
      </TypographyP>
      <TypographyP>
        Em alguns momentos do treinamento – antes da primeira sessão e depois da
        terceira e da sexta sessão – o usuário fará avaliação de algumas vozes,
        com duração aproximada de 20 minutos. A partir dessa avaliação serão
        gerados gráficos com a curva de aprendizado para que o usuário acompanhe
        com precisão este processo.
      </TypographyP>
      <TypographyH4>Está preparado?</TypographyH4>
      <div className="h-[10px]" />
      <div className="flex justify-center gap-4 py-8">
        <Button asChild>
          <Link href="/reasoning">Continuar</Link>
        </Button>
        <Button asChild>
          <Link href="/">Voltar</Link>
        </Button>
      </div>
      <TypographyMuted>
        *Santos PCM, Vieira MN, Sansão JPH e Gama ACC. Effect of
        Auditory-Perceptual Training whith Natural Voice Anchors on Vocal
        Quality Evaluation. J Voice. 2017; 33(2):220-225. Santos PCM, Vieira MN,
        Sansão JPH e Gama ACC. Efeito de emissões âncoras de vozes sintetizadas
        na avaliação perceptivo-auditivo da voz. CoDAS. 2021; 33(1):e20190197.
        Gama ACC, Mata SM, Santos PCM, Vieira MN, Sansão JPH e Quinino RC.
        Auditory Training with Synthesized Voice Anchors: Effect on Rater
        Agreement
      </TypographyMuted>
    </main>
  );
}
