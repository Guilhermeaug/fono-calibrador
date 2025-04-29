'use client'

import { DataTablePagination } from '@/components/data-table/data-table-pagination'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import copy from 'clipboard-copy'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'
import { ExportButton } from '../../components/export-button'
import { deleteGroup } from '../delete-group-action'
import { progressStatuses, Student, userStatuses } from './columns'
import { DataTableFacetedFilter } from './data-table-faceted-filter'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<Student, TValue>[]
  data: Student[]
  classId: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  classId,
}: DataTableProps<TData, TValue>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initialFilters: ColumnFiltersState = React.useMemo(() => {
    const filters: ColumnFiltersState = []
    const email = searchParams.get('email')
    const name = searchParams.get('name')
    const userStatus = searchParams.get('userStatus')
    const sessionStatus = searchParams.get('sessionStatus')

    if (email) filters.push({ id: 'email', value: email })
    if (name) filters.push({ id: 'name', value: name })
    if (userStatus) filters.push({ id: 'userStatus', value: userStatus.split(',') })
    if (sessionStatus)
      filters.push({ id: 'sessionStatus', value: sessionStatus.split(',') })

    return filters
  }, [searchParams])

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialFilters)

  const table = useReactTable<Student>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
    },
    initialState: {
      columnFilters: initialFilters,
    },
  })

  React.useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams)
      const emailFilter = columnFilters.find((f) => f.id === 'email')
      const nameFilter = columnFilters.find((f) => f.id === 'name')
      const userStatusFilter = columnFilters.find((f) => f.id === 'userStatus')
      const sessionStatusFilter = columnFilters.find((f) => f.id === 'sessionStatus')

      if (emailFilter && emailFilter.value) {
        params.set('email', String(emailFilter.value))
      } else {
        params.delete('email')
      }

      if (nameFilter && nameFilter.value) {
        params.set('name', String(nameFilter.value))
      } else {
        params.delete('name')
      }

      if (
        userStatusFilter &&
        Array.isArray(userStatusFilter.value) &&
        userStatusFilter.value.length > 0
      ) {
        params.set('userStatus', userStatusFilter.value.join(','))
      } else {
        params.delete('userStatus')
      }

      if (
        sessionStatusFilter &&
        Array.isArray(sessionStatusFilter.value) &&
        sessionStatusFilter.value.length > 0
      ) {
        params.set('sessionStatus', sessionStatusFilter.value.join(','))
      } else {
        params.delete('sessionStatus')
      }

      table.setPageIndex(0)
      params.delete('page')

      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [columnFilters, router, pathname, searchParams, table])

  const { rows } = table.getRowModel()
  const [idsToExport, userDetailsToExport] = React.useMemo(() => {
    const ids = rows.map((row) => row.original.id)
    const userDetails = rows.map((row) => row.original)

    return [ids, userDetails]
  }, [rows])

  async function copyInviteLink() {
    const inviteLink = `${window.location.origin}/invite/${classId}`
    await copy(inviteLink)
    toast.success('Link copiado para a área de transferência.')
  }

  return (
    <div className="space-y-4 p-2">
      <div className="space-y-2 md:space-y-4">
        <div className="flex gap-3 overflow-x-auto md:flex-wrap">
          <Input
            placeholder="Filtre por email"
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('email')?.setFilterValue(event.target.value)
            }
            className="h-8 w-[200px] ring-0 focus:ring-0 focus-visible:ring-0 lg:w-[250px]"
          />
          <Input
            placeholder="Filtre por nome"
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="h-8 w-[200px] ring-0 focus:ring-0 focus-visible:ring-0 lg:w-[250px]"
          />
          {table.getColumn('userStatus') && (
            <DataTableFacetedFilter
              column={table.getColumn('userStatus')}
              title="Situação do usuário"
              options={userStatuses}
            />
          )}
          {table.getColumn('sessionStatus') && (
            <DataTableFacetedFilter
              column={table.getColumn('sessionStatus')}
              title="Status da sessão atual"
              options={progressStatuses}
            />
          )}
        </div>
        <div className="flex gap-3 overflow-x-auto md:flex-wrap">
          <Button variant="outline" onClick={copyInviteLink}>
            Compartilhar convite
          </Button>
          <ExportButton
            variant="outline"
            ids={idsToExport}
            usersDetails={userDetailsToExport}
          >
            Exportar dados
          </ExportButton>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Excluir turma</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja excluir a turma?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteGroup(Number(classId))}>
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="h-[500px] max-h-full overflow-auto rounded-md border lg:h-[550px] xl:h-[650px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows?.length ? (
              rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
