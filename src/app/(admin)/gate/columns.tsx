"use client"
import { DatatableColumnAction } from "@/components/DatatableColumnAction"
import { DataTableColumnHeader } from "@/components/DatatableColumnHeader"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Gate = {
  id: number,
  IdCabang: number,
  NamaGerbang:string,
  NamaCabang:string
}

export const columns: ColumnDef<Gate>[] = [
  {
    accessorKey: "NamaCabang",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ruas" />
    ),
  },
  {
    accessorKey: "NamaGerbang",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gerbang" />
    ),
  },
  {
    accessorKey: "action",
    header: "Aksi",
    cell: ({ row }) => (
        <DatatableColumnAction id={row.original.id} IdCabang={row.original.IdCabang}/>
    )
  },
]
