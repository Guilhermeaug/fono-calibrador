import { isUserTeacher } from '@/lib/user'
import { cn } from '@/lib/utils'
import { AUTH } from '@/server/auth'
import { isNil } from 'lodash'
import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '../mode-toggle'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { NavbarDropdown } from './dropdown'

type Props = {
  className?: string
}

export async function Navbar({ className }: Props) {
  const userInfo = await AUTH.getCurrentUser()

  const hasAuth = !isNil(userInfo)
  const isTeacher = isUserTeacher(userInfo?.additionalData)

  const style = cn('flex h-16 items-center gap-4 bg-background px-4 md:px-8', className)
  return (
    <header className={style}>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center text-lg font-semibold text-muted-foreground transition-colors md:text-base"
          prefetch={false}
        >
          <Image
            className="h-auto w-auto max-w-full flex-grow"
            src="/images/logo-only.png"
            alt=""
            width={30}
            height={30}
          />
          <span className="mr-5 whitespace-nowrap">Calibrador Auditivo</span>
        </Link>
        <Link
          href="/presentation"
          className="text-muted-foreground transition-colors hover:text-foreground"
          prefetch={false}
        >
          Apresentação
        </Link>
        <Link
          href="/reasoning"
          className="text-muted-foreground transition-colors hover:text-foreground"
          prefetch={false}
        >
          Fundamentação
        </Link>
        {!hasAuth && (
          <Link
            href="/login"
            className="text-muted-foreground transition-colors hover:text-foreground"
            prefetch={false}
          >
            Login
          </Link>
        )}
        {hasAuth && isTeacher && (
          <Link
            href="/manage/add"
            className="text-muted-foreground transition-colors hover:text-foreground"
            prefetch={false}
          >
            Gerenciar turmas
          </Link>
        )}
        <Link
          href="/contact"
          className="text-muted-foreground transition-colors hover:text-foreground"
          prefetch={false}
        >
          Contato
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Ativar navegação via menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center text-sm font-semibold"
              prefetch={false}
            >
              <Image
                className="h-auto w-auto max-w-[40px] flex-grow"
                src="/images/logo-only.png"
                alt=""
                width={30}
                height={30}
              />
              <span className="mr-5 whitespace-nowrap">Calibrador Auditivo</span>
            </Link>
            <Link
              href="/presentation"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Apresentação
            </Link>
            <Link
              href="/reasoning"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Fundamentação
            </Link>
            <Link
              href="/login"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Login
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Contato
            </Link>
            <Link
              href="/manage/add"
              className="text-muted-foreground transition-colors hover:text-foreground"
              prefetch={false}
            >
              Gerenciar Turmas
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="ml-auto flex gap-4 md:gap-2 lg:gap-4">
        <ModeToggle />
        <NavbarDropdown hasAuth={hasAuth} />
      </div>
    </header>
  )
}
