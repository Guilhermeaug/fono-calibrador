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
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const table = useReactTable<Student>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      rowSelection,
    },
  })

  async function copyInviteLink() {
    const inviteLink = `${window.location.origin}/invite/${classId}`
    await copy(inviteLink)
    toast.success('Link copiado para a área de transferência.')
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 overflow-x-auto">
        <div className="flex gap-2 px-0.5">
          <Input
            placeholder="Filtre por email"
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('email')?.setFilterValue(event.target.value)
            }
            className="h-8 w-[200px] lg:w-[250px]"
          />
          {table.getColumn('userStatus') && (
            <DataTableFacetedFilter
              column={table.getColumn('userStatus')}
              title="Status"
              options={userStatuses}
            />
          )}
          {table.getColumn('sessionStatus') && (
            <DataTableFacetedFilter
              column={table.getColumn('sessionStatus')}
              title="Progresso"
              options={progressStatuses}
            />
          )}
        </div>
        <div className="space-x-2">
          <Button
            className="ml-auto self-end justify-self-end"
            variant="outline"
            onClick={copyInviteLink}
          >
            Compartilhar convite
          </Button>
          <ExportButton
            className="ml-auto self-end justify-self-end"
            variant="outline"
            ids={table.getSelectedRowModel().rows.map((row) => row.original.id)}
            usersDetails={table.getSelectedRowModel().rows.map((row) => row.original)}
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
      <div className="rounded-md border">
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
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
