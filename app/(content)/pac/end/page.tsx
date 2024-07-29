import { TypographyH1 } from "@/components/typography/h1";
import { TypographyP } from "@/components/typography/p";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AcceptTerms } from "./components/accept-terms";

export default function PacEndPage() {
  return (
    <main className="mx-auto max-w-[850px] px-8 pt-20">
      <TypographyH1 className="text-center">
        Teste do Processamento Auditivo (PAC)
      </TypographyH1>
      <TypographyP>
        Eu, declaro ter finalizado por completo o Teste do Processamento
        Auditivo por meio do acesso fornecido, estando apto à prosseguir para a
        etapa de Treinamento de Avaliação Perceptivo-Auditiva da Voz.
      </TypographyP>
      <div className="h-[30px]" />
      <AcceptTerms />
    </main>
  );
}
