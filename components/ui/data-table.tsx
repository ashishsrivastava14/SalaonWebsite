import { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface DataTableProps {
  headers: string[];
  rows: ReactNode[][];
  className?: string;
}

export function DataTable({ headers, rows, className }: DataTableProps) {
  return (
    <div className={cn("overflow-auto rounded-2xl border border-[var(--border-light)] bg-[var(--surface-raised)] shadow-[var(--shadow-sm)]", className)}>
      <table className="w-full min-w-[640px] text-left">
        <thead>
          <tr className="border-b border-[var(--border)]">
            {headers.map((header) => (
              <th key={header} className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-light)]">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="text-sm text-[var(--foreground)] transition-colors duration-150 hover:bg-[var(--accent-light)]/50">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-5 py-3.5 align-middle">
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
