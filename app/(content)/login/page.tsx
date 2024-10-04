import Image from 'next/image'
import Link from 'next/link'

import { LoginForm } from './components/LoginForm'

export default function Page() {
  return (
    <div className="p-3 lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Entre com seu e-mail ou nome de usuário abaixo
            </p>
          </div>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            Não tem uma conta?{'  '}
            <Link href="/register" className="underline">
              Se cadastre
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Image
          src="/images/auth-image.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full max-w-full object-cover dark:brightness-[0.3] dark:grayscale"
        />
      </div>
    </div>
  )
}
