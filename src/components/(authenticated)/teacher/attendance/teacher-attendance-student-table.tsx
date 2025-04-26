'use client';

import React from 'react';
import { DataTable, DataTableColumnDef } from '@/components/ui/data-table';
import type { OnChangeFn, SortingState } from '@tanstack/react-table';
import { Loader } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { IStudentAttendance } from '@/types/models';
import { Badge } from '@/components/ui/badge';
import _ from 'lodash';

interface ITeacherAttendanceStudentTableProps {
  isPending?: boolean;
  studentList: IStudentAttendance[];
  onChangeStdSelected: (_id: number) => void;
}

export const TeacherAttendanceStudentDataTable = ({
  isPending,
  studentList,
  onChangeStdSelected,
}: ITeacherAttendanceStudentTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const count = _.countBy(studentList, 'is_attendance');

  const columns = React.useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: () => (
          <Checkbox
            checked={(count[1] || 0) > 0 ? ((count[0] || 0) === 0 ? true : 'indeterminate') : false}
            onCheckedChange={(val) => onChangeStdSelected(val ? -1 : 0)}
            aria-label="Select all"
          />
        ),
        size: 20,
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
          return <div className="truncate md:max-w-[10rem]">{row.original.name}</div>;
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
