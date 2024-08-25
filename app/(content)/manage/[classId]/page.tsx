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
    let status: 'terms' | 'pac' | 'progress' = 'progress'
    if (!student.hasAcceptedTerms) {
      status = 'terms'
    } else if (student.firstPacStatus === 'READY') {
      status = 'pac'
    }
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      status,
    }
  })
}

export default async function ManagePage({
  params: { classId },
  searchParams: { show, id },
}: Props) {
  const user = await AUTH.getServerSession()
  if (!user) {
    redirect('/login')
  }
  const {
    user: { jwt },
  } = user

  const tableData = await getData(Number(classId), jwt)
  let userDetails
  if (show === 'details' && id) {
    userDetails = await STRAPI.getUserFullData({ userId: Number(id) })
  }

  return (
    <div className="container mx-auto py-2">
      <DataTable columns={columns} data={tableData} />
      {show === 'details' && id && <DetailsSheet userDetails={userDetails!} />}
    </div>
  )
}
