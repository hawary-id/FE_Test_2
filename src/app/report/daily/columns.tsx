"use client"

import { DataTableColumnHeader } from "@/components/DatatableColumnHeader"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Lalin = {
  ruas_nama: string
  gerbang_nama: string
  gardu: string
  hari: string
  tanggal: string
  metode_pembayaran: string
  gol_1: number
  gol_2: number
  gol_3: number
  gol_4: number
  gol_5: number
  total_lalin: number
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
    accessorKey: "gardu",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gardu" />
    ),
  },
  {
    accessorKey: "hari",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hari" />
    ),
  },
  {
    accessorKey: "tanggal",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tanggal" />
    ),
  },
  {
    accessorKey: "metode_pembayaran",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Metode Pembayaran" />
    ),
  },
  {
    accessorKey: "gol_1",
    header: "Gol I",
  },
  {
    accessorKey: "gol_2",
    header: "Gol II",
  },
  {
    accessorKey: "gol_4",
    header: "Gol IV",
  },
  {
    accessorKey: "gol_5",
    header: "Gol V",
  },
  {
    accessorKey: "gol_5",
    header: "Gol V",
  },
  {
    accessorKey: "total_lalin",
    header: "Total Lalin",
  },
]
