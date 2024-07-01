"use client"
import { DatatableColumnAction } from "@/components/DatatableColumnAction"
import { DataTableColumnHeader } from "@/components/DatatableColumnHeader"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Lalin = {
  ruas_nama: string
  gerbang_nama: string
}

export const columns: ColumnDef<Lalin>[] = [
  {
    accessorKey: "ruas_nama",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ruas" />
    ),
  },
  {
    accessorKey: "gerbang_nama",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gerbang" />
    ),
  },
  {
    accessorKey: "action",
    header: "Aksi",
    cell: ({ row }) => (
        <DatatableColumnAction row={row}/>
    )
  },
]
