import { cn } from "@/lib/utils";
import {
  CircleUserIcon,
  MenuIcon,
  Package2Icon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";

type Props = {
  className?: string;
};

export function Navbar({ className }: Props) {
  const style = cn(
    "flex h-16 items-center gap-4 bg-background px-4 md:px-8",
    className,
  );

  return (
    <header className={style}>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center text-lg font-semibold text-muted-foreground transition-colors md:text-base"
          prefetch={false}
        >
          <Image
            className="max-w-full flex-grow"
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
        <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
          prefetch={false}
        >
          Login
        </Link>
        <Link
          href="#"
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
                className="max-w-[40px] flex-grow"
                src="/images/logo-only.png"
                alt=""
                width={30}
                height={30}
              />
              <span className="mr-5 whitespace-nowrap">
                Calibrador Auditivo
              </span>
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
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Login
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Contato
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex gap-4 ml-auto md:gap-2 lg:gap-4">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="md:ml-auto rounded-full">
              <CircleUserIcon className="h-5 w-5" />
              <span className="sr-only">Navegação do usuário</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
