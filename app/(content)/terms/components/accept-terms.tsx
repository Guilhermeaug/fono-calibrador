"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AcceptTerms() {
  const router = useRouter();
  const [accepted, setAccepted] = React.useState(false);

  function handleSubmit() {
    if (accepted) {
      router.replace("/");
    } else {
      toast.error(
        "Para seguir para as próximas etapas, é necessário estar de acordo com o Termo de Consentimento Livre e Esclarecido.",
      );
    }
  }

  return (
    <React.Fragment>
      <div className="grid place-content-center gap-4">
        <RadioGroup
          defaultValue="not-accepted"
          onValueChange={(value: string) =>
            setAccepted(value === "accepted" ? true : false)
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="accepted" id="accepted" />
            <Label htmlFor="accepted">
              Estou de acordo em participar da pesquisa
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not-accepted" id="not-accepted" />
            <Label htmlFor="not-accepted">
              Não estou de acordo em participar da pesquisa
            </Label>
          </div>
        </RadioGroup>
        <Button onClick={handleSubmit}>Enviar</Button>
      </div>
    </React.Fragment>
  );
}
