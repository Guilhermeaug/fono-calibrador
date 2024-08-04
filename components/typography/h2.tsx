import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function TypographyH2({ children, className }: Props) {
  const style = cn('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0', className);

  return (
    <h2 className={style}>
      {children}
    </h2>
  );
}
