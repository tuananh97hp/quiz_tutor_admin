'use client';

import React from 'react';
import { DataTable, DataTableColumnDef } from '@/components/ui/data-table';
import type { OnChangeFn, SortingState } from '@tanstack/react-table';
import { IAttendance } from '@/types/models';
import { FindResultSet } from '@/types/find-result-set';
import { useUpdateSearchParams } from '@/hooks/use-update-search-params';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { Loader } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export type IDataTableResult = FindResultSet<IAttendance>;

interface ITableProps {
  results: IDataTableResult;
}

export const StudentReportAttendanceDataTable = ({ results }: ITableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isPending, startTransition] = React.useTransition();
  const updateSearchParams = useUpdateSearchParams();

  const columns = React.useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: 'Mã',
        size: 100,
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
        header: 'Tên Lớp',
        cell: ({ row }) => (
          <Badge variant="secondary">
            <span className="truncate md:max-w-[10rem]">{row.original.class_name || '-'}</span>
          </Badge>
        ),
      },
      {
        header: 'Tên Giáo Viên',
        cell: ({ row }) => {
          return (
            <a
              href="#"
              className="truncate max-w-[15rem] whitespace-normal line-clamp-1 hover:underline underline-offset-2 font-bold"
            >
              {row.original.teacher_name || '-'}
            </a>
          );
        },
      },
      {
        header: 'Ngày học',
        cell: ({ row }) => {
          return row.original.attendance_date;
        },
      },
      {
        header: 'Trạng Thái',
        cell: ({ row }) => (
          <Badge variant={row.original.is_attendance ? 'default' : 'destructive'}>
            <span className="truncate md:max-w-[10rem]">
              {row.original.is_attendance ? 'Đi học' : 'Vắng'}
            </span>
          </Badge>
        ),
      },
      {
        header: 'Đã đóng tiền',
        cell: ({ row }) => {
          if (!row.original.is_attendance) return '';
          return (
            <Badge variant={row.original.paid ? 'default' : 'destructive'}>
              <span className="truncate md:max-w-[10rem]">
                {row.original.paid ? 'Rồi' : 'Chưa'}
              </span>
            </Badge>
          );
        },
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
