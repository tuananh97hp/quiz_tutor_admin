'use client';

import React from 'react';
import { DataTable, DataTableColumnDef } from '@/components/ui/data-table';
import type { OnChangeFn, SortingState } from '@tanstack/react-table';
import { IClass, ITeacher } from '@/types/models';
import { FindResultSet } from '@/types/find-result-set';
import { useUpdateSearchParams } from '@/hooks/use-update-search-params';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { CalendarCheck, Edit, Loader, MoreHorizontal, PencilRuler, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableExpand } from '@/components/shared/table-expand';
import { Badge } from '@/components/ui/badge';
import { DAY_OF_WEEK } from '@/utils/constants/date';
import { formatMoney } from '@/utils/handle';
import { SheetClassForm } from '@/components/(authenticated)/admin/class/sheet-class-form';
import { useDisclosure } from '@/hooks/use-disclosure';
import { ClassChangeStatus } from '@/components/(authenticated)/admin/class/class-change-status';
import Link from 'next/link';

export type IClassDataTableResult = FindResultSet<IClass>;

interface IClassTableProps {
  results: IClassDataTableResult;
}

export const StudentReportClassDataTable = ({ results }: IClassTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isPending, startTransition] = React.useTransition();
  const updateSearchParams = useUpdateSearchParams();

  const columns = React.useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: 'Mã Lớp',
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
        header: 'Giáo Viên',
        cell: ({ row }) => {
          return (
            <Badge variant="default">
              <span className="truncate md:max-w-[10rem]">
                {row.original.teacher ? renderTeacherName(row.original.teacher) : '-'}
              </span>
            </Badge>
          );
        },
      },
      {
        header: 'Học phí',
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
                <span className="text-foreground/50 text-xs font-medium">Bắt đầu: &nbsp;</span>
                <div className="text-foreground/50 text-sm font-medium">{schedule.start_time}</div>
              </div>
              <div className="flex items-center gap-y-1">
                <span className="text-foreground/50 text-xs font-medium">Kết thúc: &nbsp;</span>
                <div className="text-foreground/50 text-sm font-medium">{schedule.end_time}</div>
              </div>
              <div className="flex items-center gap-y-1">
                <span className="text-foreground/50 text-xs font-medium">Thứ: &nbsp;</span>
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

  const renderTeacherName = (teacher: ITeacher) => {
    return (
      <span className="truncate md:max-w-[10rem] hover:underline underline-offset-2 font-bold">
        ({teacher.id}) {teacher.name}
      </span>
    );
  };

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
