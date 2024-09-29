import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { isNil } from 'lodash'
import { ForgotPasswordForm } from './components/ForgotPasswordForm'

type Props = {
  searchParams: {
    code?: string
  }
}

export default function ForgotPasswordPage({ searchParams: { code } }: Props) {
  const description = isNil(code)
    ? 'Entre com seu e-mail abaixo para recuperar sua senha'
    : 'Escolha uma nova senha para compor sua conta'

  return (
    <main className="mx-auto max-w-[850px] p-3 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Recuperação de Senha</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm code={code} />
        </CardContent>
      </Card>
    </main>
  )
}
