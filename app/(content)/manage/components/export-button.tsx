'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import dayjs from 'dayjs'
import writeXlsxFile from 'write-excel-file'
import { Student } from '../[classId]/components/columns'
import { xlsxSchemaSessionsDetails, xlsxSchemaUserDetails } from '../constants'
import { exportData } from '../helpers'
import { getUsersSessionsAction } from './get-users-sessions-action'

type Props = {
  ids: number[]
  usersDetails?: Student[]
} & ButtonProps

export function ExportButton({ ids, usersDetails, ...props }: Props) {
  async function generateSessionsSheetObjects() {
    const usersProgress = await getUsersSessionsAction(ids)
    const csvRows = usersProgress
      .map((user) => exportData(user.sessions, user.user.id))
      .flat()
    return csvRows
  }

  async function downloadXlsx() {
    const sessionsSheetObjects = await generateSessionsSheetObjects()
    const currentTime = dayjs().format('YYYY-MM-DD_HH-mm-ss')
    const fileName = `dados_${currentTime}.xlsx`

    if (usersDetails) {
      // @ts-ignore
      await writeXlsxFile([usersDetails, sessionsSheetObjects], {
        schema: [xlsxSchemaUserDetails, xlsxSchemaSessionsDetails],
        sheets: ['usuários', 'resultados'],
        fileName,
      })
    } else {
      //@ts-ignore
      await writeXlsxFile(sessionsSheetObjects, {
        schema: xlsxSchemaSessionsDetails,
        sheet: 'resultados',
        fileName,
      })
    }
  }

  return (
    <Button onClick={downloadXlsx} {...props}>
      {props.children}
    </Button>
  )
}
