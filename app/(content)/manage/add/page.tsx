import { AUTH } from '@/server/auth'
import { redirect } from 'next/navigation'
import { CreateGroup } from './components/CreateGroup'

export default async function Page() {
  const userInfo = await AUTH.getCurrentUser()
  if (!userInfo) {
    redirect('/login')
  }

  return (
    <div>
      <h1 className="text-lg">Preencha os campos para criar uma nova turma.</h1>
      <CreateGroup userInfo={userInfo} />
    </div>
  )
}
