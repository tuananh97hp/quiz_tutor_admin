'use client';

import React from 'react';
import { DataTable, DataTableColumnDef } from '@/components/ui/data-table';
import type { OnChangeFn, SortingState } from '@tanstack/react-table';
import { IStudent } from '@/types/models';
import { FindResultSet } from '@/types/find-result-set';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { ChevronsRight, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

type IStudentDataTableResult = FindResultSet<IStudent>;

interface IStudentTableProps {
  onPaginationChange: (page: number, perPage: number) => void;
  onAssign: (student: IStudent) => void;
  results: IStudentDataTableResult;
  isPending?: boolean;
}

export const UnassignedStudentDataTable = ({
  results,
  isPending,
  onPaginationChange,
  onAssign,
}: IStudentTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: 'Mã học sinh',
        size: 20,
        cell: ({ row }) => {
          return (
            <a
              href="#"
              className="truncate md:max-w-[10rem] hover:underline underline-offset-2 font-bold"
            >
              {row.original.id}
            </a>
          );
        },
      },
      {
        header: 'Tên',
        cell: ({ row }) => {
          return (
            <a
              href="#"
              className="truncate max-w-[15rem] whitespace-normal line-clamp-1 hover:underline underline-offset-2 font-bold"
            >
              {row.original.name}
            </a>
          );
        },
      },
      {
        header: 'Thêm',
        cell: ({ row }) => {
          return (
            <Button size="sm" variant="outline" onClick={() => onAssign(row.original)}>
              <ChevronsRight />
            </Button>
          );
        },
        size: 50,
      },
    ] satisfies DataTableColumnDef<(typeof results)['data'][number]>[];
  }, []);

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    if (typeof updaterOrValue === 'function') {
      setSorting(updaterOrValue(sorting));
    } else {
      setSorting(updaterOrValue);
    }
  };

  return (
    <div className="relative">
      <DataTable
        columns={columns}
        data={results.data}
        perPage={results.meta.per_page}
        currentPage={results.meta.current_page}
        totalPages={results.meta.total}
        onPaginationChange={onPaginationChange}
        sorting={sorting}
        onSortingChange={handleSortingChange}
      >
        {(table) => <DataTablePagination additionalInformation="VisibleCount" table={table} />}
      </DataTable>

      {isPending && (
        <div className="bg-background/50 absolute inset-0 flex items-center justify-center">
          <Loader className="text-muted-foreground h-8 w-8 animate-spin" />
        </div>
      )}
    </div>
  );
};
