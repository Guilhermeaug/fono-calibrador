import { mkConfig } from 'export-to-csv'

export const getCsvConfig = (
  filename: string,
  headers: string[] = [],
  useKeysAsHeaders = true,
) => {
  return mkConfig({
    fieldSeparator: ',',
    filename,
    decimalSeparator: '.',
    columnHeaders: headers,
    useKeysAsHeaders,
  })
}
