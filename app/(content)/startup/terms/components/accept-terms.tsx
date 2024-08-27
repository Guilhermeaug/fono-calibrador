'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { STRAPI } from '@/server/strapi'
import * as React from 'react'
import { toast } from 'sonner'

type Props = {
  userId: number
  jwt: string
}

export function AcceptTerms({ userId, jwt }: Props) {
  const [accepted, setAccepted] = React.useState(false)

  async function handleSubmit() {
    if (accepted) {
      await STRAPI.putUser({
        data: {
          hasAcceptedTerms: true,
        },
        jwt,
        userId,
      })
      toast.success(
        'Termo de Consentimento Livre e Esclarecido aceito com sucesso! Redirecionando...',
      )
      setTimeout(() => {
        window.location.href = '/startup'
      }, 2000)
    } else {
      toast.error(
        'Para seguir para as próximas etapas, é necessário estar de acordo com o Termo de Consentimento Livre e Esclarecido.',
      )
    }
  }

  return (
    <React.Fragment>
      <div className="grid place-content-center gap-4">
        <RadioGroup
          defaultValue="not-accepted"
          onValueChange={(value: string) =>
            setAccepted(value === 'accepted' ? true : false)
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="accepted" id="accepted" />
            <Label htmlFor="accepted">Estou de acordo em participar da pesquisa</Label>
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
  )
}
