import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function TypographyH4({ children, className }: Props) {
  const style = cn(
    "scroll-m-20 text-xl font-semibold tracking-tight [&:not(:first-child)]:mt-6",
    className,
  );
  return <h4 className={style}>{children}</h4>;
}
