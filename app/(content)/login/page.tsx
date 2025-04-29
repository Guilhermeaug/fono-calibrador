import Image from 'next/image'
import Link from 'next/link'

import { LoginForm } from './components/LoginForm'

export default function Page() {
  return (
    <main className="h-full gap-12 p-4 lg:grid lg:grid-cols-2 lg:p-8 xl:p-16">
      <div className="flex h-full items-center justify-center">
        <div className="max-w-lg flex-1 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Entre com seu e-mail ou nome de usuário abaixo
            </p>
          </div>
          <LoginForm />
          <div className="mt-2 text-center text-md">
            Não tem uma conta?{'  '}
            <Link href="/register" className="underline">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
      <div className="relative hidden max-w-lg lg:block">
        <Image
          src="/images/logo.png"
          className="block max-w-full self-center object-contain dark:grayscale"
          alt=""
          fill
        />
      </div>
    </main>
  )
}
