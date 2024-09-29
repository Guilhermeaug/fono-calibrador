import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AUTH } from '@/server/auth'
import { redirect } from 'next/navigation'
import { Invite } from './components/Invite'

type Props = {
  params: {
    classId: string
  }
}

export default async function InvitePage({ params: { classId } }: Props) {
  const userInfo = await AUTH.getCurrentUser()
  if (!userInfo) {
    redirect('/login')
  }

  return (
    <main className="mx-auto max-w-[900px] p-3 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Convite para entrar em uma nova turma
          </CardTitle>
          <CardDescription>
            Você foi convidado para entrar em uma nova turma. Clique no botão abaixo para
            aceitar o convite.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Invite userInfo={userInfo} classId={classId} />
        </CardContent>
      </Card>
    </main>
  )
}
