'use client';

import React from 'react';
import { DataTable, DataTableColumnDef } from '@/components/ui/data-table';
import type { OnChangeFn, SortingState } from '@tanstack/react-table';
import { Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Checkbox } from '@/components/ui/checkbox';
import { IStudentAttendance } from '@/types/models';
import { Badge } from '@/components/ui/badge';

interface IAttendanceStudentTableProps {
  isPending?: boolean;
  studentList: IStudentAttendance[];
  onChangeStdSelected: (_id: number) => void;
}

export const AttendanceStudentDataTable = ({
  isPending,
  studentList,
  onChangeStdSelected,
}: IAttendanceStudentTableProps) => {
  const { data: currentSession } = useSession();
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: 'Code',
        size: 50,
        cell: ({ row }) => {
          return (
            <Checkbox
              checked={!!row.original.is_attendance}
              onCheckedChange={() => onChangeStdSelected(row.original.id)}
            >
              {row.original.id}
            </Checkbox>
          );
        },
      },
      {
        header: 'Status',
        size: 100,
        cell: ({ row }) => {
          if (row.original.is_attendance) {
            return <Badge variant="default">Present</Badge>;
          }
          return <Badge variant="destructive">Absent</Badge>;
        },
      },
      {
        header: 'Name',
        cell: ({ row }) => {
          return (
            <div className="truncate md:max-w-[10rem]">
              {row.original.first_name} {row.original.last_name || ''}
            </div>
          );
        },
      },
    ] satisfies DataTableColumnDef<(typeof studentList)[number]>[];
  }, [onChangeStdSelected]);

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
        data={studentList}
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
