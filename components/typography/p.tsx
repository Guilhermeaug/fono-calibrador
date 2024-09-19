import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
}

export function TypographyP({ children, className }: Props) {
  const style = cn('text-justify leading-7 [&:not(:first-child)]:mt-6', className)

  return <p className={style}>{children}</p>
}
