
import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SortAsc, SortDesc, Filter } from "lucide-react";

interface CSVViewerProps {
  data: string[][];
}

export function CSVViewer({ data }: CSVViewerProps) {
  const [sortConfig, setSortConfig] = useState<{ column: number; direction: 'asc' | 'desc' } | null>(null);
  const [filterValue, setFilterValue] = useState('');

  // Filter the data based on search input
  const filteredData = useMemo(() => {
    if (!filterValue) return data;
    
    const searchLower = filterValue.toLowerCase();
    const headers = data[0];
    return [
      headers,
      ...data.slice(1).filter(row =>
        row.some(cell => cell.toLowerCase().includes(searchLower))
      )
    ];
  }, [data, filterValue]);

  // Sort the data based on column
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    const sorted = [...filteredData];
    const [headers, ...rows] = sorted;

    return [
      headers,
      ...rows.sort((a, b) => {
        const aValue = a[sortConfig.column];
        const bValue = b[sortConfig.column];
        
        // Check if values are numbers
        const aNum = Number(aValue);
        const bNum = Number(bValue);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
        }
        
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      })
    ];
  }, [filteredData, sortConfig]);

  const handleSort = (columnIndex: number) => {
    setSortConfig(current => ({
      column: columnIndex,
      direction: current?.column === columnIndex && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  if (!data.length) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Filter data..."
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-lg overflow-auto max-h-[600px]">
        <table className="w-full border-collapse min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              {data[0].map((header, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort(i)}
                >
                  <div className="flex items-center gap-2">
                    {header}
                    {sortConfig?.column === i && (
                      sortConfig.direction === 'asc' ? 
                        <SortAsc className="h-4 w-4" /> : 
                        <SortDesc className="h-4 w-4" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.slice(1).map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {row.map((cell, j) => (
                  <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
