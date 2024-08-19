import Link from 'next/link'

type Props = {
  params: {
    classId: string
  }
}

export default function ManagePage({}: Props) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex flex-col flex-1 gap-4 md:gap-8 bg-muted/40 p-4 md:p-10 min-h-[calc(90vh_-_theme(spacing.16))]">
        <div className="gap-2 grid mx-auto w-full max-w-6xl">
          <h1 className="font-semibold text-3xl">Turmas</h1>
        </div>
        <div className="items-start gap-6 grid md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] mx-auto w-full max-w-6xl">
          <nav className="gap-4 grid text-muted-foreground text-sm">
            <Link href="#" className="font-semibold text-primary">
              Piloto
            </Link>
          </nav>
          <div className="gap-6 grid"></div>
        </div>
      </main>
    </div>
  )
}
