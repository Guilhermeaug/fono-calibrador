'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontalIcon } from 'lucide-react'
import Link from 'next/link'

export type Students = {
  id: number
  name: string
  email: string
  status: 'terms' | 'pac' | 'progress'
}

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
        <div
          className={`rounded-md px-2 py-1 text-white ${
            status === 'terms'
              ? 'bg-yellow-500'
              : status === 'pac'
                ? 'bg-blue-500'
                : 'bg-green-500'
          }`}
        >
          {status === 'terms'
            ? 'Aguardando aceite dos termos'
            : status === 'pac'
              ? 'Aguardando envio do PAC'
              : 'Em treinamento'}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const id = row.original.id

      return (
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
            {/* <DropdownMenuSeparator /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
