'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { STRAPI } from '@/server/strapi'
import { UserInfo } from '@/server/types'
import * as React from 'react'
import { toast } from 'sonner'

type Props = {
  userInfo: UserInfo
}

export function AcceptTerms({ userInfo }: Props) {
  const [accepted, setAccepted] = React.useState(false)

  async function handleSubmit() {
    if (accepted) {
      await STRAPI.putUser({
        data: {
          firstPacStatus: 'DONE',
          finalPacStatus: userInfo.firstPacStatus === 'DONE' ? 'DONE' : userInfo.finalPacStatus,
        },
        userId: userInfo.id,
        jwt: userInfo.jwt,
      })
      toast.success(
        'Teste do Processamento Auditivo finalizado com sucesso! Redirecionando...',
      )
      setTimeout(() => {
        window.location.href = '/startup'
      }, 2000)
    } else {
      toast.error(
        'Para seguir para as próximas etapas, é necessário ter realizado o Teste do Processamento Auditivo e concordar com o termo de conclusão do mesmo. Favor dar continuidade ao treinamento após a realização do teste e aceite do termo.',
        { duration: 10000 },
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
            <Label htmlFor="accepted">Estou de acordo</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not-accepted" id="not-accepted" />
            <Label htmlFor="not-accepted">Não estou de acordo</Label>
          </div>
        </RadioGroup>
        <Button onClick={handleSubmit}>Enviar</Button>
      </div>
    </React.Fragment>
  )
}
