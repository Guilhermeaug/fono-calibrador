import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
}

export function TypographyMuted({ children, className }: Props) {
  const style = cn('text-sm text-muted-foreground', className)

  return <p className={style}>{children}</p>
}
