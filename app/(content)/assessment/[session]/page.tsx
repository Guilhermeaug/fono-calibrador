import { TypographyH2 } from "@/components/typography";
import { STRAPI } from "@/server/strapi";
import { AsssessmentForm } from "./components/AssessmentForm";
import { shuffle } from "fast-shuffle";

type Props = {
  params: {
    session: string;
  };
  searchParams: {
    step?: string;
  };
};

export default async function Page({
  params: { session },
  searchParams: { step },
}: Props) {
  const program = await STRAPI.getProgramAssessment({ id: 1 });
  program.assessment = shuffle(program.assessment);

  const title = `Sessão ${session} - Avaliação ${step}`;
  return (
    <main className="mx-auto max-w-[850px] px-8 pt-16">
      <TypographyH2>{title}</TypographyH2>
      <div className="h-[40px]" />
      <AsssessmentForm program={program} />
    </main>
  );
}
