'use client'

import { Button } from '@/components/ui/button'
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
          <Tooltip>
            <Button variant="ghost" asChild>
              <Link
                href={item.href}
                className={cn(
                  pathnameIncludes(item.href)
                    ? 'bg-muted hover:bg-muted'
                    : 'hover:bg-transparent hover:underline',
                  'justify-start whitespace-nowrap',
                )}
              >
                <TooltipTrigger>{item.title}</TooltipTrigger>
                <TooltipContent>{item.title}</TooltipContent>
              </Link>
            </Button>
          </Tooltip>
        </TooltipProvider>
      ))}
    </nav>
  )
}
