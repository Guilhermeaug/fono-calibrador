'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSession } from '@/hooks/use-session'
import { STRAPI } from '@/server/strapi'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'

type Props = {
  children: React.ReactNode
  name: string
  userId: number
  disabled: boolean
}

export function AddLinkModal({ children, name, userId, disabled }: Props) {
  const session = useSession()
  const router = useRouter()

  const [link, setLink] = React.useState('')

  async function handleClick() {
    const jwt = session?.jwt
    if (!link || !jwt) {
      return
    }
    try {
      await STRAPI.putUser({
        userId: userId,
        data: {
          pacLink: link,
        },
        jwt,
      })
      toast.success('Link salvo com sucesso')
      router.refresh()
    } catch (error) {
      toast.error('Erro ao salvar link')
    }
  }

  return (
    <Dialog>
      <DialogTrigger disabled={disabled}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Incluir link do teste</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input disabled id="name" defaultValue={name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-right">
              Link
            </Label>
            <Input
              className="col-span-3"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClick}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
