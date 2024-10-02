import { AUTH } from '@/server/auth'
import { STRAPI } from '@/server/strapi'
import { redirect } from 'next/navigation'
import { columns, Students } from './components/columns'
import { DataTable } from './components/data-table'
import { DetailsSheet } from './components/details-sheet'

type Props = {
  params: {
    classId: string
  }
  searchParams: {
    show?: 'details'
    id?: number
  }
}

async function getData(classId: number, jwt: string): Promise<Students[]> {
  const data = await STRAPI.getStudentsInClass({ groupId: Number(classId), jwt })
  return data.map((student) => {
    let status: 'terms' | 'waiting_pac' | 'pac' | 'progress' = 'progress'
    if (!student.hasAcceptedTerms) {
      status = 'terms'
    } else if (!student.pacLink) {
      status = 'waiting_pac'
    } else if (student.firstPacStatus === 'READY') {
      status = 'pac'
    }
    return {
      status,
      ...student,
    }
  })
}

export default async function ManagePage({
  params: { classId },
  searchParams: { show, id },
}: Props) {
  const user = await AUTH.getCurrentUser()
  if (!user) {
    redirect('/login')
  }

  const tableData = await getData(Number(classId), user.jwt)
  let userDetails
  if (show === 'details' && id) {
    userDetails = await STRAPI.getUserFullData({ userId: Number(id) })
  }

  return (
    <main className="mx-auto py-2">
      <DataTable columns={columns} data={tableData} classId={classId} />
      {show === 'details' && id && <DetailsSheet userDetails={userDetails!} />}
    </main>
  )
}
