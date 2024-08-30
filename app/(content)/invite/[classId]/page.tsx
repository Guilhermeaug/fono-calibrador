import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AUTH } from '@/server/auth'
import { Invite } from './components/Invite'

type Props = {
  params: {
    classId: string
  }
}

export default async function InvitePage({ params: { classId } }: Props) {
  const userInfo = await AUTH.getCurrentUser()
  if (!userInfo) {
    return null
  }

  return (
    <main className="mx-auto max-w-[900px] p-8">
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">
            Convite para entrar em uma nova turma
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Invite userInfo={userInfo} classId={classId} />
        </CardContent>
      </Card>
    </main>
  )
}
