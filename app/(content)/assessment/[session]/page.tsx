import { TypographyH2 } from "@/components/typography";
import { Slider } from "@/components/ui/slider";
import { VoiceSlider } from "@/components/VoiceSlider";
import { STRAPI } from "@/server/strapi";
import { AsssessmentForm } from "./components/AssessmentForm";

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

  const title = `Sessão ${session} - Avaliação ${step}`;
  return (
    <main className="mx-auto max-w-[850px] px-8 pt-16">
      <TypographyH2>{title}</TypographyH2>
      <div className="h-[40px]" />
      <AsssessmentForm program={program} />
    </main>
  );
}
