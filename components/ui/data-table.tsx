import { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface DataTableProps {
  headers: string[];
  rows: ReactNode[][];
  className?: string;
}

export function DataTable({ headers, rows, className }: DataTableProps) {
  return (
    <div className={cn("overflow-auto rounded-2xl border border-[#e8dbcf] bg-white", className)}>
      <table className="w-full min-w-[640px] text-left">
        <thead className="bg-[#f8f2ec] text-sm text-[#7a5a45]">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t border-[#eee2d7] text-sm text-[#4f3829]">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 align-middle">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
