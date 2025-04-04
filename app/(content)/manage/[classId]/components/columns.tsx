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
import { UserStatus, UserWithAdditionalData } from '@/server/types'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontalIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { toast } from 'sonner'
import { clearUserTimeout } from '../clear-user-timeout-action'
import { removeUserFromGroup } from '../remove-user-action'
import { revalidateUser } from '../revalidate-user-action'
import { AddLinkModal } from './add-link-modal'

export type Student = UserWithAdditionalData & {
  userStatus: string
  sessionStatus: UserStatus
  currentSession: number | null
}

export const userStatuses = [
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

export const progressStatuses = [
  {
    value: 'WAITING',
    label: 'Esperando',
  },
  {
    value: 'DONE',
    label: 'Completo',
  },
  {
    value: 'INVALID',
    label: 'Inválido',
  },
  {
    value: 'READY',
    label: 'Pronto',
  },
]

export function getColumns(isAdmin: boolean, groupId: number): ColumnDef<Student>[] {
  return [
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
      accessorKey: 'userStatus',
      cell: ({ row }) => {
        const status = row.original.userStatus
        return (
          <span className="whitespace-nowrap rounded-md bg-fuchsia-300 px-2 py-1 text-xs uppercase dark:bg-fuchsia-700">
            {status === 'terms' && 'Aguardando aceite dos termos'}
            {status === 'waiting_pac' && 'Sem link PAC'}
            {status === 'pac' && 'Aguardando PAC'}
            {status === 'progress' && 'Em progresso'}
          </span>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      header: 'Progresso',
      accessorKey: 'sessionStatus',
      cell: ({ row }) => {
        const status = row.original.sessionStatus
        return (
          <span className="whitespace-nowrap rounded-md bg-fuchsia-300 px-2 py-1 text-xs uppercase dark:bg-fuchsia-700">
            {status === 'DONE' && 'Completo'}
            {status === 'INVALID' && 'Inválido'}
            {status === 'READY' && 'Pronto'}
            {status === 'WAITING' && 'Esperando'}
          </span>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      header: 'Sessão atual',
      id: 'currentSession',
      cell: ({ row }) => {
        const currentSession = row.original.currentSession
        return (
          <span className="whitespace-nowrap rounded-md bg-amber-300 px-2 py-1 text-xs uppercase dark:bg-amber-700">
            {currentSession}
          </span>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const { id, name, email, pacLink } = row.original

        async function removeTimeout() {
          await clearUserTimeout(id)
          toast.success('Tempo de espera removido com sucesso!')
        }

        async function revalidate() {
          await revalidateUser(id, groupId)
          toast.success('O usuário está pronto para realizar o teste novamente!')
        }

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
                  <Link href={`results?id=${id}&name=${name}`}>
                    Visualizar resultados
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <React.Fragment>
                    <DropdownMenuItem onClick={removeTimeout}>
                      Remover tempo de espera
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={revalidate}>
                      Remover invalidação
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AddLinkModal
                      name={name}
                      userId={id}
                      pacLink={pacLink}
                      userEmail={email}
                      groupId={groupId}
                    />
                  </React.Fragment>
                )}
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
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      onClick={async () => {
                        await removeUserFromGroup(groupId, id)
                      }}
                    >
                      Remover usuário
                    </Button>
                  </DialogTrigger>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )
      },
    },
  ]
}
