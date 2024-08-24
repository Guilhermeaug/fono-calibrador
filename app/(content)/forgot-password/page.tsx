import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Suspense } from 'react'
import { ForgotPasswordForm } from './components/ForgotPasswordForm'

export default function ForgotPasswordPage() {
  return (
    <main className="mx-auto max-w-[850px] p-8">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Recuperação de Senha</CardTitle>
          <CardDescription>
            Entre com seu e-mail abaixo para recuperar sua senha
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense>
            <ForgotPasswordForm />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  )
}
