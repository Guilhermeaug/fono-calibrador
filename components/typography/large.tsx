import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
}

export function TypographyLarge({ children, className }: Props) {
  const style = cn('text-lg font-semibold', className)
  return <p className={style}>{children}</p>
}
