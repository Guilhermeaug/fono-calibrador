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
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { putUserAction } from '@/server/actions/put-user-action'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'
import { sendEmailTemplateAction } from '../send-email-action'

type Props = {
  name: string
  userId: number
  userEmail: string
  pacLink?: string
  groupId: number
}

export function AddLinkModal({ name, userEmail, userId, groupId, pacLink = '' }: Props) {
  const router = useRouter()

  const [link, setLink] = React.useState(pacLink)

  async function handleClick() {
    if (isEmpty(link)) {
      return
    }

    try {
      await Promise.all([
        putUserAction({
          userId,
          groupId,
          data: {
            pacLink: link,
          },
        }),
        sendEmailTemplateAction(
          userEmail,
          {
            user: {
              name,
            },
          },
          6,
        ),
      ])
      toast.success('Link salvo com sucesso')
      router.refresh()
    } catch (error) {
      toast.error('Erro ao salvar link')
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Adicionar link do PAC
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Incluir link para o Audbility</DialogTitle>
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
              value={link ?? ''}
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
