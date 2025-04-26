'use client';

import React from 'react';
import { DataTable, DataTableColumnDef } from '@/components/ui/data-table';
import type { OnChangeFn, SortingState } from '@tanstack/react-table';
import { IStudent } from '@/types/models';
import { ListFindResultSet } from '@/types/find-result-set';
import { ChevronsLeft, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

type IStudentDataTableResult = ListFindResultSet<IStudent>;

interface IStudentTableProps {
  isPending?: boolean;
  onUnassign: (student: IStudent) => void;
  onSetMonitor: (student: IStudent) => void;
  results: IStudentDataTableResult;
}

export const AssignedStudentDataTable = ({
  isPending,
  results,
  onUnassign,
  onSetMonitor,
}: IStudentTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo(() => {
    return [
      {
        header: 'Lớp trưởng',
        cell: ({ row }) => {
          return (
            <Checkbox
              checked={!!row.original.is_lesson_monitor}
              onCheckedChange={() => {
                onSetMonitor(row.original);
              }}
            >
              {row.original.id}
            </Checkbox>
          );
        },
      },
      {
        accessorKey: 'id',
        header: 'Mã học sinh',
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
        header: 'Tên',
        cell: ({ row }) => {
          return (
            <a
              href="#"
              className="truncate max-w-[15rem] whitespace-normal line-clamp-1 hover:underline underline-offset-2 font-bold"
            >{`${row.original.name}`}</a>
          );
        },
      },
      {
        header: 'Loại bỏ',
        cell: ({ row }) => {
          return (
            <Button size="sm" variant="destructive" onClick={() => onUnassign(row.original)}>
              <ChevronsLeft />
            </Button>
          );
        },
        size: 50,
      },
    ] satisfies DataTableColumnDef<(typeof results)['data'][number]>[];
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
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
        sorting={sorting}
        onSortingChange={handleSortingChange}
      />

      {isPending && (
        <div className="bg-background/50 absolute inset-0 flex items-center justify-center">
          <Loader className="text-muted-foreground h-8 w-8 animate-spin" />
        </div>
      )}
    </div>
  );
};
