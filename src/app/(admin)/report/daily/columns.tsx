"use client"

import { DataTableColumnHeader } from "@/components/DatatableColumnHeader"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Lalin = {
  id: number;
    IdCabang: number;
    IdGerbang: number;
    Tanggal: string;
    Shift: number;
    IdGardu: number;
    Golongan: number;
    IdAsalGerbang: number;
    Tunai: number;
    DinasOpr: number;
    DinasMitra: number;
    DinasKary: number;
    eMandiri: number;
    eBri: number;
    eBni: number;
    eBca: number;
    eNobu: number;
    eDKI: number;
    eMega: number;
    eFlo: number;
    gol_1: number;
    gol_2: number;
    gol_3: number;
    gol_4: number;
    gol_5: number;
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
    accessorKey: "Tanggal",
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
