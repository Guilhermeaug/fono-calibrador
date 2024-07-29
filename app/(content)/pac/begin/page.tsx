import { TypographyH1 } from "@/components/typography/h1";
import { TypographyP } from "@/components/typography/p";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PacBeginPage() {
  return (
    <main className="mx-auto max-w-[850px] px-8 pt-20">
      <TypographyH1 className="text-center">
        Teste do Processamento Auditivo (PAC)
      </TypographyH1>
      <TypographyP>
        Antes de iniciar a avaliação das vozes, realize o{" "}
        <b>Teste do Processamento Auditivo (PAC)</b>. Para realizá-lo, basta
        clicar no botão abaixo. Você será direcionado ao site AudBility, onde
        realizará o teste.
      </TypographyP>
      <TypographyP className="font-bold">
        Importante: após realizar o teste, é necessário retornar nesta página e
        assinar virtualmente o Termo de Conclusão do PAC abaixo para prosseguir
        para a última etapa, o Treinamento de Avaliação Perceptivo-Auditiva.
      </TypographyP>
      <div className="mx-auto grid w-1/2 grid-cols-2 place-content-center gap-4 py-8">
        <Button asChild>
          <Link href="/startup">Iniciar</Link>
        </Button>
        <Button asChild>
          <Link href="end">Termo de Conclusão PAC</Link>
        </Button>
      </div>
    </main>
  );
}
