"use client";

import { Lalin } from "@/app/report/daily/columns";
import {
    TableCell,
    TableFooter,
    TableRow
} from "@/components/ui/table";
import {
    Table
} from "@tanstack/react-table";

interface DataTableFooterProps<TData extends Lalin> {
  table: Table<TData>;
}

export function DataTableFooter<TData extends Lalin>({
  table,
}: DataTableFooterProps<TData>) {
  const tableData = table.getFilteredRowModel().rows.map((row) => row.original);

  const ruasTotals: { [ruas: string]: { [column: string]: number } } = {
    "Ruas 1": {
      GolI: 0,
      GolII: 0,
      GolIII: 0,
      GolIV: 0,
      GolV: 0,
      Total: 0,
    },
    "Ruas 2": {
      GolI: 0,
      GolII: 0,
      GolIII: 0,
      GolIV: 0,
      GolV: 0,
      Total: 0,
    },
    Keseluruhan: {
      GolI: 0,
      GolII: 0,
      GolIII: 0,
      GolIV: 0,
      GolV: 0,
      Total: 0,
    },
  };

  tableData.forEach((row: Lalin) => {
    const currentRuas = row.ruas_nama; 

    // Conditional Update: Only update totals if currentRuas is "Ruas 1"
    if (currentRuas === "Ruas 1") {
      ruasTotals[currentRuas].GolI += row.GolI ?? 0;
      ruasTotals[currentRuas].GolII += row.GolII ?? 0;
      ruasTotals[currentRuas].GolIII += row.GolIII ?? 0;
      ruasTotals[currentRuas].GolIV += row.GolIV ?? 0;
      ruasTotals[currentRuas].GolV += row.GolV ?? 0;
      ruasTotals[currentRuas].Total += row.Total ?? 0;
    }

    if (currentRuas === "Ruas 2") {
      ruasTotals[currentRuas].GolI += row.GolI ?? 0;
      ruasTotals[currentRuas].GolII += row.GolII ?? 0;
      ruasTotals[currentRuas].GolIII += row.GolIII ?? 0;
      ruasTotals[currentRuas].GolIV += row.GolIV ?? 0;
      ruasTotals[currentRuas].GolV += row.GolV ?? 0;
      ruasTotals[currentRuas].Total += row.Total ?? 0;
    }

    // Still update the "Keseluruhan" totals for all rows
    ruasTotals.Keseluruhan.GolI += row.GolI ?? 0;
    ruasTotals.Keseluruhan.GolII += row.GolII ?? 0;
    ruasTotals.Keseluruhan.GolIII += row.GolIII ?? 0;
    ruasTotals.Keseluruhan.GolIV += row.GolIV ?? 0;
    ruasTotals.Keseluruhan.GolV += row.GolV ?? 0;
    ruasTotals.Keseluruhan.Total += row.Total ?? 0;
  });

  return (
    <TableFooter>
        {Object.entries(ruasTotals).map(([ruas, totals]) => (
            <TableRow key={ruas} className="bg-gray-200">
                <TableCell colSpan={6} className="text-center">
                    Total Lalin {ruas}
                </TableCell>
                {Object.entries(totals).map(([column, total]) => (
                    <TableCell key={column} className="font-medium">
                    {total}
                    </TableCell>
                ))}
            </TableRow>
        ))}
    </TableFooter>
  );
}
