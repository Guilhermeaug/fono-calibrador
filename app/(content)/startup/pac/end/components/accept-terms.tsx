'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { putUserAction } from '@/server/actions/put-user-action'
import { UserInfo } from '@/server/types'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'

type Props = {
  userInfo: UserInfo
}

export function AcceptTerms({ userInfo }: Props) {
  const router = useRouter()

  const [accepted, setAccepted] = React.useState(false)

  async function handleSubmit() {
    if (accepted) {
      await putUserAction({
        data: {
          firstPacStatus: 'DONE',
          finalPacStatus:
            userInfo.firstPacStatus === 'DONE' ? 'DONE' : userInfo.finalPacStatus,
        },
        userId: userInfo.id,
      })
      toast.success(
        'Teste do Processamento Auditivo finalizado com sucesso!',
      )
      router.push('/startup')
      router.refresh()
    } else {
      toast.error(
        'Para seguir para as próximas etapas, é necessário ter realizado o Teste do Processamento Auditivo e concordar com o termo de conclusão do mesmo. Favor dar continuidade ao treinamento após a realização do teste e aceite do termo.',
        { duration: 10000 },
      )
    }
  }

  return (
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
  )
}
