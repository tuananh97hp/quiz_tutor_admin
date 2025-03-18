'use client';

import React from 'react';
import { DataTable, DataTableColumnDef } from '@/components/ui/data-table';
import type { OnChangeFn, SortingState } from '@tanstack/react-table';
import { IClass } from '@/types/models';
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

export type IClassDataTableResult = FindResultSet<IClass>;

interface IClassTableProps {
  results: IClassDataTableResult;
}
interface IClassDataTableAction {
  classItem: IClass;
}

const ClassDataTableAction = ({ classItem }: IClassDataTableAction) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger data-testid="document-table-action-btn">
        <MoreHorizontal className="text-muted-foreground h-5 w-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52" align="start" forceMount>
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <PencilRuler className="mr-2 h-4 w-4" /> Change Status
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Users className="mr-2 h-4 w-4" /> Students
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CalendarCheck className="mr-2 h-4 w-4" />
          Attendance
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export const ClassDataTable = ({ results }: IClassTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isPending, startTransition] = React.useTransition();
  const updateSearchParams = useUpdateSearchParams();

  const columns = React.useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: 'Code',
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
        header: 'Class Name',
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
        header: 'Start Date',
        cell: ({ row }) => {
          return (
            <Badge variant="default">
              <span className="truncate md:max-w-[10rem]">{row.original.start_date || '-'}</span>
            </Badge>
          );
        },
      },
      {
        header: 'Actions',
        cell: ({ row }) => <ClassDataTableAction classItem={row.original} />,
        size: 70,
      },
      {
        header: 'Expand',
        cell: ({ row }) => {
          return <TableExpand isExpand={row.getIsExpanded()} onClick={row.toggleExpanded} />;
        },
        size: 50,
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
        renderSubComponent={({ row }) => {
          return (
            <div className="flex items-center gap-y-1 py-3 gap-x-20 pl-10">
              <div className="flex items-center gap-x-3">
                <div className="text-foreground/50 font-medium">Schedule: &nbsp;</div>
                <div className="flex flex-col">
                  {row.original.schedules.map((schedule, index) => (
                    <div key={index} className="flex gap-x-3">
                      <div className="flex items-center gap-y-1">
                        <span className="text-foreground/50 text-xs font-medium">
                          Start: &nbsp;
                        </span>
                        <div className="text-foreground/50 text-sm font-medium">
                          {schedule.start_time}
                        </div>
                      </div>
                      <div className="flex items-center gap-y-1">
                        <span className="text-foreground/50 text-xs font-medium">End: &nbsp;</span>
                        <div className="text-foreground/50 text-sm font-medium">
                          {schedule.end_time}
                        </div>
                      </div>
                      <div className="flex items-center gap-y-1">
                        <span className="text-foreground/50 text-xs font-medium">
                          Day of week: &nbsp;
                        </span>
                        <div className="text-foreground/50 text-sm font-medium">
                          {DAY_OF_WEEK[schedule.day_of_week]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-x-3">
                <div className="text-foreground/50 font-medium">Fee: &nbsp;</div>
                <div className="flex flex-col">
                  <Badge variant="warning">
                    <span className="truncate md:max-w-[10rem]">
                      {formatMoney(row.original.fee)}đ
                    </span>
                  </Badge>
                </div>
              </div>
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
