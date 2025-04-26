'use client';

import React from 'react';
import { DataTable, DataTableColumnDef } from '@/components/ui/data-table';
import type { OnChangeFn, SortingState } from '@tanstack/react-table';
import { IClass, ITeacher } from '@/types/models';
import { FindResultSet } from '@/types/find-result-set';
import { useUpdateSearchParams } from '@/hooks/use-update-search-params';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { Loader } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatMoney } from '@/utils/handle';
import { DAY_OF_WEEK } from '@/utils/constants/date';

export type IClassDataTableResult = FindResultSet<IClass>;

interface IClassTableProps {
  results: IClassDataTableResult;
}

export const TeacherReportClassDataTable = ({ results }: IClassTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isPending, startTransition] = React.useTransition();
  const updateSearchParams = useUpdateSearchParams();

  const columns = React.useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: 'Mã lớp',
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
        header: 'Tên lớp',
        cell: ({ row }) => {
          return (
            <a
              href="#"
              className="truncate md:max-w-[10rem] hover:underline underline-offset-2 font-bold"
            >
              {row.original.name}
            </a>
          );
        },
      },
      {
        header: 'Học Phí',
        cell: ({ row }) => {
          return (
            <Badge variant="warning">
              <span className="truncate md:max-w-[10rem]">{formatMoney(row.original.fee)}đ</span>
            </Badge>
          );
        },
      },
      {
        header: 'Lịch học',
        cell: ({ row }) => {
          return row.original.schedules.map((schedule, index) => (
            <div key={index} className="flex gap-x-3">
              <div className="flex items-center gap-y-1">
                <span className="text-foreground/50 text-xs font-medium">Start: &nbsp;</span>
                <div className="text-foreground/50 text-sm font-medium">{schedule.start_time}</div>
              </div>
              <div className="flex items-center gap-y-1">
                <span className="text-foreground/50 text-xs font-medium">End: &nbsp;</span>
                <div className="text-foreground/50 text-sm font-medium">{schedule.end_time}</div>
              </div>
              <div className="flex items-center gap-y-1">
                <span className="text-foreground/50 text-xs font-medium">Day of week: &nbsp;</span>
                <div className="text-foreground/50 text-sm font-medium">
                  {DAY_OF_WEEK[schedule.day_of_week]}
                </div>
              </div>
            </div>
          ));
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
