"use client"

import { DataTableColumnHeader } from "@/components/DatatableColumnHeader"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
interface Lalin {
  IdCabang: number;
  IdGerbang: number;
  IdGardu: number;
  Tanggal: string;
  Hari: string;
  MetodePembayaran: string;
  GolI: number;
  GolII: number;
  GolIII: number;
  GolIV: number;
  GolV: number;
  Total: number;
}

export const columns: ColumnDef<Lalin>[] = [
  {
    accessorKey: "IdCabang",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ruas" />
    ),
  },
  {
    accessorKey: "IdGerbang",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gerbang" />
    ),
  },
  {
    accessorKey: "IdGardu",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gardu" />
    ),
  },
  {
    accessorKey: "Hari",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hari" />
    ),
  },
  {
    accessorKey: "Tanggal",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tanggal" />
    ),
  },
  {
    accessorKey: "MetodePembayaran",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Metode Pembayaran" />
    ),
  },
  {
    accessorKey: "GolI",
    header: "Gol I",
  },
  {
    accessorKey: "GolII",
    header: "Gol II",
  },
  {
    accessorKey: "GolIII",
    header: "Gol IV",
  },
  {
    accessorKey: "GolIV",
    header: "Gol V",
  },
  {
    accessorKey: "GolV",
    header: "Gol V",
  },
  {
    accessorKey: "Total",
    header: "Total Lalin",
  },
]
