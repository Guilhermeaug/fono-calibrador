'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { addNewLine, getCsvConfig } from '@/lib/csv'
import dayjs from 'dayjs'
import { asString, generateCsv } from 'export-to-csv'
import JSZip from 'jszip'
import { exportData } from '../helpers'
import { getUsersSessions } from './get-users-sessions-action'

type Props = {
  ids: number[]
} & ButtonProps

export function ExportButton({ ids, ...props }: Props) {
  async function downloadCsv() {
    const usersProgress = await getUsersSessions(ids)
    const csvRows = usersProgress.map((user) => ({
      userId: user.user.id,
      data: exportData(user.sessions),
    }))
    const currentTime = dayjs().format('YYYY-MM-DD_HH-mm-ss')
    const zip = new JSZip()
    for (const { userId, data } of csvRows) {
      if (!data.length) continue
      const csvConfig = getCsvConfig(`resultados_${userId}_${currentTime}.csv`)
      const csv = generateCsv(csvConfig)(data)
      const csvBufferStr = addNewLine(asString(csv))
      zip.file(`resultados_${userId}_${currentTime}.csv`, csvBufferStr)
    }
    const zipData = await zip.generateAsync({ type: 'blob' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(zipData)
    link.download = `resultados_${currentTime}.zip`
    link.click()
  }

  return (
    <Button onClick={downloadCsv} {...props}>
      {props.children}
    </Button>
  )
}
