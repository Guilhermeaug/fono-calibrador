import { TypographyMuted } from "@/components/typography/muted";
import { TypographyP } from "@/components/typography/p";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ReasoningPage() {
  return (
    <main className="mx-auto max-w-[850px] px-8 pt-20">
      <TypographyP>
        A avaliação perceptivo-auditiva é o principal instrumento de avaliação
        da clínica vocal. Por essa avaliação, as vozes são analisadas a partir
        da escuta do avaliador, que usa suas referências internas do que é uma
        voz normal ou alterada, bem como tipos e graus de alteração, para
        classificá-las. Essas referências são construídas a partir da
        experiência prévia do avaliador, seja por treinamento ou pela prática
        clínica, podendo, portanto, haver importante variação dessas
        referências.
      </TypographyP>
      <TypographyP>
        Sendo assim, o objetivo do Calibrador Auditivo é padronizar as
        referências internas dos avaliadores iniciantes e calibrar
        periodicamente as referências dos profissionais, a fim de aumentar a
        concordância intra e interavaliador, favorecendo a confiabilidade da
        avaliação.
      </TypographyP>
      <TypographyP>
        Este instrumento é estruturado em duas partes, uma para treinamento do
        parâmetro Rugosidade, e outra para Soprosidade, alterações prevalentes
        da clínica vocal. O Calibrador Auditivo considera aspectos que são
        indicados pela literatura como favoráveis ao processo de aprendizagem:
      </TypographyP>
      <TypographyP>
        1. A repetição dos estímulos: você escutará mais de uma vez a voz a ser
        avaliada;
      </TypographyP>
      <TypographyP>
        2. O uso de estímulos referências: serão disponibilizadas vozes que
        servirão como referências para cada grau de desvio do parâmetro em
        treinamento, que te auxiliarão a classificar corretamente a voz em
        avaliação;
      </TypographyP>
      <TypographyP>
        3. Estímulo de diferenciação: para que facilite a diferenciação de R e
        B, estes parâmetros serão primeiramente apresentados e treinados
        separadamente;
      </TypographyP>
      <TypographyP>
        4. Feedback: a cada tentativa de classificação você receberá uma
        devolutiva se sua resposta está certa ou errada.
      </TypographyP>
      <TypographyP>
        Pesquisas anteriores* mostraram uma curva de aprendizagem ascendente a
        partir do treinamento para R e B, com melhora importante da concordância
        após o treinamento.
      </TypographyP>
      <div className="h-[10px]" />
      <div className="flex justify-center gap-4 py-8">
        <Button asChild>
          <Link href="/startup">Iniciar</Link>
        </Button>
        <Button asChild>
          <Link href="/presentation">Voltar</Link>
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
