'use client'

import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  function pathnameIncludes(href: string) {
    return pathname.includes(href)
  }

  return (
    <nav
      className={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)}
      {...props}
    >
      {items.map((item) => (
        <TooltipProvider key={item.href}>
          <Link
            href={item.href}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              pathnameIncludes(item.href)
                ? 'bg-muted hover:bg-muted'
                : 'hover:bg-transparent hover:underline',
              'justify-start overflow-clip',
            )}
          >
            <Tooltip>
              <TooltipTrigger>{item.title}</TooltipTrigger>
              <TooltipContent>{item.title}</TooltipContent>
            </Tooltip>
          </Link>
        </TooltipProvider>
      ))}
    </nav>
  )
}
