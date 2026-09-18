import type { ReactNode } from 'react';

export interface DataTableColumn {
  key: string;
  label: string;
}

export function DataTable({
  columns,
  rows,
  emptyLabel = 'No records yet.',
}: {
  columns: DataTableColumn[];
  rows: Record<string, ReactNode>[];
  emptyLabel?: string;
}) {
  if (rows.length === 0) {
    return <p className="font-body text-sm text-steel py-6 text-center">{emptyLabel}</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-steel/20">
            {columns.map((col) => (
              <th key={col.key} className="text-left font-body text-xs text-steel font-medium py-2 pr-4">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-steel/10">
              {columns.map((col) => (
                <td key={col.key} className="font-body text-sm text-mist py-3 pr-4">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
