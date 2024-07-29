import * as React from "react";
import { TypographyH1 } from "@/components/typography/h1";
import { TypographyP } from "@/components/typography/p";
import { CheckList } from "./components/check-list";

export default function StartupPage() {
  return (
    <main className="mx-auto max-w-[850px] px-8 pt-20">
      <TypographyH1 className="text-center">
        Seja bem vindo ao Calibrador Auditivo!
      </TypographyH1>
      <TypographyP className="text-center">
        As atividades do treinamento devem ser realizadas respeitando a ordem
        abaixo.
      </TypographyP>
      <TypographyP className="text-center">
        Clique na etapa em que parou para continuar.
      </TypographyP>
      <div className="h-[8px]" />
      <CheckList />
      <TypographyP className="text-center">
        Os resultados são atualizados a cada sessão.
      </TypographyP>
      <div className="h-[30px]" />
    </main>
  );
}
