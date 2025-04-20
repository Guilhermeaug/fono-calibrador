'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { putUserAction } from '@/server/actions/put-user-action'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'
import { sendTermsEmailAction } from '../../send-terms-email-action'

type Props = {
  userId: number
}

export function AcceptTerms({ userId }: Props) {
  const router = useRouter()

  const [accepted, setAccepted] = React.useState(false)

  async function handleSubmit() {
    if (accepted) {
      await putUserAction({
        data: {
          hasAcceptedTerms: true,
        },
        userId,
      })
      await sendTermsEmailAction()
      toast.success(
        'Termo de Consentimento Livre e Esclarecido aceito com sucesso! Redirecionando...',
      )
      setTimeout(() => {
        router.push('/startup')
      }, 2000)
    } else {
      toast.error(
        'Para seguir para as próximas etapas, é necessário estar de acordo com o Termo de Consentimento Livre e Esclarecido.',
      )
    }
  }

  return (
    <div className="space-y-6">
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
      <Button onClick={handleSubmit} className="w-full uppercase">
        Enviar
      </Button>
    </div>
  )
}
