'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontalIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { removeUserFromGroup } from '../remove-user-action'
import { AddLinkModal } from './add-link-modal'

export type Students = {
  id: number
  name: string
  email: string
  status: 'terms' | 'waiting_pac' | 'pac' | 'progress'
  pacLink?: string
}

export const statuses = [
  {
    value: 'terms',
    label: 'Aguardando aceite dos termos',
  },
  {
    value: 'waiting_pac',
    label: 'Sem link PAC',
  },
  {
    value: 'pac',
    label: 'Aguardando PAC',
  },
  {
    value: 'progress',
    label: 'Em progresso',
  },
]

export const columns: ColumnDef<Students>[] = [
  {
    header: 'Nome',
    accessorKey: 'name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <span className="whitespace-nowrap rounded-md bg-fuchsia-300 px-2 py-1 text-xs uppercase dark:bg-fuchsia-700">
          {status === 'terms' && 'Aguardando aceite dos termos'}
          {status === 'waiting_pac' && 'Sem link PAC'}
          {status === 'pac' && 'Aguardando PAC'}
          {status === 'progress' && 'Em progresso'}
        </span>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, name, status, email } = row.original

      const enableAddPacLink = status === 'waiting_pac'

      return (
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href={`?show=details&id=${id}`}>Mostrar Detalhes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`results?id=${id}&name=${name}`}>Visualizar resultados</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AddLinkModal
                name={name}
                userId={id}
                userEmail={email}
                disabled={!enableAddPacLink}
              >
                <DropdownMenuItem
                  disabled={!enableAddPacLink}
                  onSelect={(e) => e.preventDefault()}
                >
                  Adicionar link do PAC
                </DropdownMenuItem>
              </AddLinkModal>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <TrashIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Tem certeza que deseja remover o usuário da turma?
                </DialogTitle>
                <DialogDescription>
                  Essa ação é irreversível e removerá o usuário da turma. Para que você
                  volte a vê-lo, será necessário que ele seja adicionado novamente.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    const groupId = window.location.pathname.split('/').pop()
                    await removeUserFromGroup(Number(groupId), id)
                  }}
                >
                  Remover usuário
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
]
