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
import { UserWithAdditionalData } from '@/server/types'
import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { MoreHorizontalIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { toast } from 'sonner'
import { clearUserTimeout } from '../clear-user-timeout-action'
import { removeUserFromGroup } from '../remove-user-action'
import { revalidateUser } from '../revalidate-user-action'
import { AddLinkModal } from './add-link-modal'

export type UserStatusType = 'TERMS' | 'WAITING_PAC' | 'PAC' | 'PROGRESS' | 'DONE'
export type ProgressStatusType = 'WAITING' | 'DONE' | 'INVALID' | 'READY'

export type Student = UserWithAdditionalData & {
  userStatus: UserStatusType
  sessionStatus: ProgressStatusType
  currentSession: number | null
  timeoutEndDate: string | null
  nextDueDate: string | null
}

export const userStatuses = [
  {
    value: 'TERMS',
    label: 'Aguardando aceite dos termos',
  },
  {
    value: 'WAITING_PAC',
    label: 'Sem link PAC',
  },
  {
    value: 'PAC',
    label: 'Aguardando conclusão do PAC',
  },
  {
    value: 'PROGRESS',
    label: 'Em progresso',
  },
  {
    value: 'DONE',
    label: 'Completo',
  },
]

export const progressStatuses = [
  {
    value: 'WAITING',
    label: 'Em espera',
  },
  {
    value: 'DONE',
    label: 'Completa',
  },
  {
    value: 'INVALID',
    label: 'Inválida',
  },
  {
    value: 'READY',
    label: 'Pronta',
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
      header: 'Situação',
      accessorKey: 'userStatus',
      cell: ({ row }) => {
        const status = row.original.userStatus
        return (
          <span className="whitespace-nowrap rounded-md bg-emerald-300 px-2 py-1 text-xs uppercase dark:bg-emerald-700">
            {userStatuses.find((s) => s.value === status)?.label}
          </span>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      header: 'Status da Sessão',
      accessorKey: 'sessionStatus',
      cell: ({ row }) => {
        const status = row.original.sessionStatus
        return (
          <span className="whitespace-nowrap rounded-md bg-fuchsia-300 px-2 py-1 text-xs uppercase dark:bg-fuchsia-700">
            {progressStatuses.find((s) => s.value === status)?.label}
          </span>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      header: 'Sessão Atual',
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
      header: 'Próxima liberação',
      id: 'timeoutEndDate',
      cell: ({ row }) => {
        const timeout = row.original.timeoutEndDate

        return dayjs(timeout).isValid() ? (
          <span className="whitespace-nowrap rounded-md bg-secondary px-2 py-1 text-xs uppercase text-secondary-foreground">
            {dayjs(timeout).format('DD/MM/YYYY HH:mm')}
          </span>
        ) : null
      },
    },
    {
      header: 'Prazo',
      id: 'nextDueDate',
      cell: ({ row }) => {
        const nextDueDate = row.original.nextDueDate

        return dayjs(nextDueDate).isValid() ? (
          <span className="whitespace-nowrap rounded-md bg-red-300 px-2 py-1 text-xs uppercase dark:bg-red-700">
            {dayjs(nextDueDate).format('DD/MM/YYYY HH:mm')}
          </span>
        ) : null
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const { id, name, email, pacLink, sessionStatus } = row.original

        async function removeTimeout() {
          await clearUserTimeout(id, groupId)
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
                    <DropdownMenuItem
                      onClick={removeTimeout}
                      disabled={sessionStatus !== 'WAITING'}
                    >
                      Remover tempo de espera
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={revalidate}
                      disabled={sessionStatus !== 'INVALID'}
                    >
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
                <Button variant="ghost" className="h-8 w-8 p-0" size="icon">
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
                      className="h-8 w-8 p-0"
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
