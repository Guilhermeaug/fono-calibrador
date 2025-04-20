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
    <main className="mx-auto flex h-full max-w-[500px] items-center justify-center p-4 lg:max-w-[600px] lg:p-8">
      <Card className="w-full">
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
