'use client'

import { Button } from '@/components/ui/button'
import { STRAPI } from '@/server/strapi'
import { UserInfo } from '@/server/types'
import { toast } from 'sonner'

type Props = {
  userInfo: UserInfo
  classId: string
}

export function Invite({ userInfo, classId }: Props) {
  async function acceptInvite() {
    await STRAPI.acceptInvite({
      groupId: Number(classId),
      jwt: userInfo.jwt,
      userId: userInfo.id,
    })
    toast.success('Convite aceito com sucesso!')
    setTimeout(() => {
      window.location.href = '/'
    }, 2000)
  }

  return (
    <Button className="uppercase w-full block" onClick={acceptInvite}>
      Aceitar convite
    </Button>
  )
}
