import { mkConfig } from 'export-to-csv'

const getCsvConfig = (
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

const addNewLine = (s: string): string => s + '\n'

export { addNewLine, getCsvConfig }
