'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AUTH } from '@/server/auth'
import { isEmpty, isNil } from 'lodash'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import * as React from 'react'
import { toast } from 'sonner'

type Props = {
  code?: string
}

export function ForgotPasswordForm({ code }: Props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const codeExists = !isNil(code)

  async function handleToken() {
    if (isEmpty(email)) {
      return
    }

    await AUTH.sendResetPasswordToken({ email })
    toast.success('Você receberá um e-mail com instruções para recuperar sua senha.')
  }

  async function handleNewPassword() {
    if (!codeExists || isEmpty(password)) {
      return
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{6,}$/
    if (!regex.test(password)) {
      toast.error(
        'Senha deve conter pelo menos 6 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
      )
      return
    }

    const res: {
      jwt: string
      user: { username: string }
    } = await AUTH.resetPassword({ code, password })
    await signIn('credentials', {
      identifier: res.user.username,
      password: password,
      redirect: false,
    })
    toast.success('Sua senha foi alterada com sucesso. Redirecionando...')
    setTimeout(() => {
      window.location.href = '/'
    }, 3000)
  }

  return (
    <React.Fragment>
      <div className="grid gap-3">
        {isNil(code) && (
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
        {!isNil(code) && (
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Digite a nova senha</Label>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        <Button
          className="w-full uppercase"
          onClick={code ? handleNewPassword : handleToken}
        >
          Recuperar senha
        </Button>
      </div>
      <div className="text-md mt-3 text-center">
        Ainda não tem uma conta? {'  '}
        <Link href="/register" className="underline">
          Cadastre-se
        </Link>
      </div>
    </React.Fragment>
  )
}
