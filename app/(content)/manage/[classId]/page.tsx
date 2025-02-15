import { AUTH } from '@/server/auth'
import { STRAPI } from '@/server/strapi'
import { redirect } from 'next/navigation'
import * as React from 'react'
import { Student } from './components/columns'
import { DetailsSheet } from './components/details-sheet'
import { Table } from './Table'

type Props = {
  params: {
    classId: string
  }
  searchParams: {
    show?: 'details'
    id?: number
  }
}

async function getData(classId: number, jwt: string): Promise<Student[]> {
  const data = await STRAPI.getStudentsInClass({ groupId: Number(classId), jwt })
  return data.map(({ userProgress: { status: sessionStatus, sessions }, ...student }) => {
    let userStatus: 'terms' | 'waiting_pac' | 'pac' | 'progress' = 'progress'
    if (!student.hasAcceptedTerms) {
      userStatus = 'terms'
    } else if (!student.pacLink) {
      userStatus = 'waiting_pac'
    } else if (student.firstPacStatus === 'READY') {
      userStatus = 'pac'
    }
    return {
      userStatus,
      sessionStatus,
      currentSession: sessions?.length ? sessions?.length : null,
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
  const userDetails =
    tableData.find((student) => student.id === Number(id))?.additionalData || null

  return (
    <React.Fragment>
      <Table userInfo={user} data={tableData} classId={classId} />
      {show === 'details' && id && <DetailsSheet userDetails={userDetails!} />}
    </React.Fragment>
  )
}
