import { AUTH } from '@/server/auth'
import { STRAPI } from '@/server/strapi'
import dayjs from 'dayjs'
import { redirect } from 'next/navigation'
import * as React from 'react'
import { Student, UserStatusType } from './components/columns'
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
  const res = await STRAPI.getStudentsInClass({ groupId: classId, jwt })

  const now = dayjs()

  return res.data.map(
    ({
      userProgress: { status, sessions, nextDueDate, timeoutEndDate, ...userProgress },
      ...student
    }) => {
      let userStatus: UserStatusType = 'PROGRESS'
      if (!student.hasAcceptedTerms) {
        userStatus = 'TERMS'
      } else if (!student.pacLink) {
        userStatus = 'WAITING_PAC'
      } else if (student.firstPacStatus === 'READY') {
        userStatus = 'PAC'
      }

      let sessionStatus = status
      if (nextDueDate && now.isAfter(dayjs(nextDueDate))) {
        sessionStatus = 'INVALID'
        nextDueDate = null
      } else if (timeoutEndDate && now.isAfter(dayjs(timeoutEndDate))) {
        sessionStatus = 'READY'
        timeoutEndDate = null
      }

      return {
        currentSession: sessions?.length ? sessions?.length : null,
        userStatus,
        sessionStatus,
        timeoutEndDate,
        nextDueDate,
        ...student,
      }
    },
  )
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
    <div className="w-full">
      <React.Suspense fallback={<div className="h-[600px] w-full animate-pulse"></div>}>
        <Table userInfo={user} data={tableData} classId={classId} />
      </React.Suspense>
      {show === 'details' && id && <DetailsSheet userDetails={userDetails!} />}
    </div>
  )
}
