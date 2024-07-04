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
      gol_1: 0,
      gol_2: 0,
      gol_3: 0,
      gol_4: 0,
      gol_5: 0,
      total_lalin: 0,
    },
    "Ruas 2": {
      gol_1: 0,
      gol_2: 0,
      gol_3: 0,
      gol_4: 0,
      gol_5: 0,
      total_lalin: 0,
    },
    Keseluruhan: {
      gol_1: 0,
      gol_2: 0,
      gol_3: 0,
      gol_4: 0,
      gol_5: 0,
      total_lalin: 0,
    },
  };

  tableData.forEach((row: Lalin) => {
    const currentRuas = row.ruas_nama; 

    // Conditional Update: Only update totals if currentRuas is "Ruas 1"
    if (currentRuas === "Ruas 1") {
      ruasTotals[currentRuas].gol_1 += row.gol_1 ?? 0;
      ruasTotals[currentRuas].gol_2 += row.gol_2 ?? 0;
      ruasTotals[currentRuas].gol_3 += row.gol_3 ?? 0;
      ruasTotals[currentRuas].gol_4 += row.gol_4 ?? 0;
      ruasTotals[currentRuas].gol_5 += row.gol_5 ?? 0;
      ruasTotals[currentRuas].total_lalin += row.total_lalin ?? 0;
    }

    if (currentRuas === "Ruas 2") {
      ruasTotals[currentRuas].gol_1 += row.gol_1 ?? 0;
      ruasTotals[currentRuas].gol_2 += row.gol_2 ?? 0;
      ruasTotals[currentRuas].gol_3 += row.gol_3 ?? 0;
      ruasTotals[currentRuas].gol_4 += row.gol_4 ?? 0;
      ruasTotals[currentRuas].gol_5 += row.gol_5 ?? 0;
      ruasTotals[currentRuas].total_lalin += row.total_lalin ?? 0;
    }

    // Still update the "Keseluruhan" totals for all rows
    ruasTotals.Keseluruhan.gol_1 += row.gol_1 ?? 0;
    ruasTotals.Keseluruhan.gol_2 += row.gol_2 ?? 0;
    ruasTotals.Keseluruhan.gol_3 += row.gol_3 ?? 0;
    ruasTotals.Keseluruhan.gol_4 += row.gol_4 ?? 0;
    ruasTotals.Keseluruhan.gol_5 += row.gol_5 ?? 0;
    ruasTotals.Keseluruhan.total_lalin += row.total_lalin ?? 0;
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
