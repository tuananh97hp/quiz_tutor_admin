'use client';

import React, { useEffect } from 'react';
import { DataTable, DataTableColumnDef } from '@/components/ui/data-table';
import type { OnChangeFn, SortingState } from '@tanstack/react-table';
import { Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { IAttendance } from '@/types/models';
import StudentService from '@/services/StudentService';
import { Checkbox } from '@/components/ui/checkbox';

interface IPaymentAttendanceTableProps {
  student_id?: number;
  attendanceSelected?: number[];
  onChangeAttSelected: (attendance_id: number) => void;
}

export const PaymentAttendanceAttendanceDataTable = ({
  student_id,
  attendanceSelected,
  onChangeAttSelected,
}: IPaymentAttendanceTableProps) => {
  const { data: currentSession } = useSession();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isPending, startTransition] = React.useTransition();
  const [attendanceList, setAttendanceList] = React.useState<IAttendance[]>([]);

  useEffect(() => {
    startTransition(async () => {
      if (currentSession?.accessToken && student_id) {
        const results = await StudentService.fetchAttendanceStudent(
          currentSession?.accessToken,
          student_id,
        );
        if (results.data) {
          setAttendanceList(results.data);
        }
      } else {
        setAttendanceList([]);
      }
    });
  }, [currentSession?.accessToken, student_id]);

  const columns = React.useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: 'Code',
        size: 100,
        cell: ({ row }) => {
          return (
            <Checkbox
              checked={attendanceSelected?.includes(row.original.id)}
              onCheckedChange={() => {
                onChangeAttSelected(row.original.id);
              }}
            >
              {row.original.id}
            </Checkbox>
          );
        },
      },
      {
        header: 'Date',
        cell: ({ row }) => {
          return (
            <a
              href="#"
              className="truncate md:max-w-[10rem] whitespace-normal line-clamp-1 hover:underline underline-offset-2 font-bold"
            >{`${row.original.attendance_date}`}</a>
          );
        },
      },
      {
        header: 'Description',
        cell: ({ row }) => {
          return <div className="truncate md:max-w-[10rem]">{row.original.desc || '-'}</div>;
        },
      },
    ] satisfies DataTableColumnDef<(typeof attendanceList)[number]>[];
  }, [attendanceSelected, onChangeAttSelected]);

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
        data={attendanceList}
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
