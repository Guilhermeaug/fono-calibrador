'use client'

import { CircleUserIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

type Props = {}

export function NavbarDropdown({ }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full md:ml-auto">
          <CircleUserIcon className="h-5 w-5" />
          <span className="sr-only">Navegação do usuário</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => signOut()}>Sair do sistema</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
