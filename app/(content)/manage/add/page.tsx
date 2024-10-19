import { AUTH } from '@/server/auth'
import { redirect } from 'next/navigation'
import * as React from 'react'
import { CreateGroup } from './components/CreateGroup'

export default async function Page() {
  const userInfo = await AUTH.getCurrentUser()
  if (!userInfo) {
    redirect('/login')
  }

  return (
    <React.Fragment>
      <h1 className="text-lg">Preencha os campos para criar uma nova turma.</h1>
      <CreateGroup userInfo={userInfo} />
    </React.Fragment>
  )
}
