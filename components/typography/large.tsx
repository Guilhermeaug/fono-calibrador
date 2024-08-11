import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
}

export function TypographyLarge({ children, className }: Props) {
  const style = cn('font-semibold text-lg', className)
  return <p className={style}>{children}</p>
}
