import Link from 'next/link'

import { TypographyH1, TypographyP } from '@/components/typography'
import { RegisterForm } from './components/RegisterForm'

export default function Page() {
  return (
    <main className="mx-auto max-w-[850px] p-4 lg:p-8 xl:p-16">
      <div className="grid gap-1 text-center">
        <TypographyH1 className="text-center text-3xl">Cadastro</TypographyH1>
        <TypographyP className="text-balance text-center text-muted-foreground">
          Preencha os campos abaixo para criar sua conta no Calibrador Auditivo
        </TypographyP>
        <div className="mt-1 text-center text-sm">
          <TypographyP className="text-center">
            Já possui cadastro?{'  '}
            <Link href="/login" className="underline">
              Entre com sua conta
            </Link>
          </TypographyP>
        </div>
      </div>
      <RegisterForm />
    </main>
  )
}
