'use client'

import { Button } from '@/components/ui/button'
import { UserInfo } from '@/server/types'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { acceptInviteAction } from '../accept-invite-action'

type Props = {
  userInfo: UserInfo
  classId: string
}

export function Invite({ userInfo, classId }: Props) {
  const router = useRouter()

  async function acceptInvite() {
    await acceptInviteAction({
      groupId: Number(classId),
      userId: userInfo.id,
    })
    toast.success('Convite aceito com sucesso!')
    router.push('/')
  }

  return (
    <Button className="block w-full uppercase" onClick={acceptInvite}>
      Aceitar convite
    </Button>
  )
}
