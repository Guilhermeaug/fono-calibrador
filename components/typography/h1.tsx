import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
}

export function TypographyH1({ children, className }: Props) {
  const style = cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)

  return <h1 className={style}>{children}</h1>
}
