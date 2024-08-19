'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AUTH } from '@/server/auth'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'

export function ForgotPasswordForm() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  async function handleToken() {
    if (!email) {
      return
    }

    try {
      await AUTH.sendResetPasswordToken({ email })
      toast.success('Você receberá um e-mail com instruções para recuperar sua senha.')
    } catch (error: any) {
      console.error(error)
    }
  }

  async function handleNewPassword() {
    if (!code || !password) {
      return
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{6,}$/
    if (!regex.test(password)) {
      toast.error(
        'Senha deve conter pelo menos 6 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
      )
      return
    }

    try {
      const res: {
        jwt: string
        user: { username: string }
      } = await AUTH.resetPassword({ code, password })
      await signIn('credentials', {
        identifier: res.user.username,
        password: password,
        redirect: false,
      })
      toast.success('Sua senha foi alterada com sucesso.')
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <React.Fragment>
      <div className="grid gap-4">
        {!code && (
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
        {code && (
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
      <div className="mt-4 text-center text-sm">
        Ainda não tem uma conta? {'  '}
        <Link href="/register" className="underline">
          Se cadastre
        </Link>
      </div>
    </React.Fragment>
  )
}
