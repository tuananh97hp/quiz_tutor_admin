'use client';

import React from 'react';
import { DataTable, DataTableColumnDef } from '@/components/ui/data-table';
import type { OnChangeFn, SortingState } from '@tanstack/react-table';
import { IStudent } from '@/types/models';
import { FindResultSet } from '@/types/find-result-set';
import { useUpdateSearchParams } from '@/hooks/use-update-search-params';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { Loader } from 'lucide-react';

export type IStudentDataTableResult = FindResultSet<IStudent>;

interface IStudentTableProps {
  results: IStudentDataTableResult;
}
export const StudentDataTable = ({ results }: IStudentTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isPending, startTransition] = React.useTransition();
  const updateSearchParams = useUpdateSearchParams();

  const columns = React.useMemo(() => {
    return [
      {
        accessorKey: 'code',
        header: 'Code',
      },
      {
        header: 'Name',
        cell: 'Name',
      },
      {
        id: 'role',
        header: 'Job',
        size: 140,
      },
      {
        id: 'phone',
        header: 'Phone',
      },
      {
        id: 'email',
        header: 'Email',
      },
      {
        id: 'scoring',
        header: 'AI Scoring',
        cell: ({ row }) => {
          return <>{row}</>;
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
          return <>{row}</>;
        },
        size: 140,
      },
      {
        id: 'recipient',
        header: 'Recipient',
        accessorKey: 'recipient',
        cell: ({ row }) => <>{row}</>,
      },
      {
        header: 'Actions',
        cell: ({ row }) => <>return null</>,
        size: 140,
      },
    ] satisfies DataTableColumnDef<(typeof results)['data'][number]>[];
  }, []);

  const onPaginationChange = (page: number, perPage: number) => {
    startTransition(() => {
      updateSearchParams({
        page,
        perPage,
      });
    });
  };

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
        perPage={results.perPage}
        currentPage={results.currentPage}
        totalPages={results.totalPages}
        onPaginationChange={onPaginationChange}
        renderSubComponent={({ row }) => {
          return (
            <div>
              <p className="p-4 text-center text-gray-500">No matching recipients found.</p>
            </div>
          );
        }}
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
