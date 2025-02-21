'use client'

import { UserWithAdditionalData } from '@/server/types'
import { getColumns, Student } from './components/columns'
import { DataTable } from './components/data-table'

type TableProps = {
  data: Student[]
  classId: string
  userInfo: UserWithAdditionalData
}

export function Table({ userInfo, data, classId }: TableProps) {
  const { isAdmin } = userInfo

  const columns = getColumns(isAdmin, Number(classId))

  return <DataTable columns={columns} data={data} classId={classId} />
}
