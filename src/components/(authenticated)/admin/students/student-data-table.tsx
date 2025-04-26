'use client';

import React from 'react';
import { DataTable, DataTableColumnDef } from '@/components/ui/data-table';
import type { OnChangeFn, SortingState } from '@tanstack/react-table';
import { IStudent } from '@/types/models';
import { FindResultSet } from '@/types/find-result-set';
import { useUpdateSearchParams } from '@/hooks/use-update-search-params';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import {
  Edit,
  Loader,
  MoreHorizontal,
  PencilRuler,
  CalendarCheck,
  HandCoins,
  EyeIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TableExpand } from '@/components/shared/table-expand';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { StudentChangeStatus } from '@/components/(authenticated)/admin/students/student-change-status';
import { useDisclosure } from '@/hooks/use-disclosure';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export type IStudentDataTableResult = FindResultSet<IStudent>;

interface IStudentTableProps {
  results: IStudentDataTableResult;
}
interface IStudentDataTableAction {
  student: IStudent;
}

const StudentDataTableAction = ({ student }: IStudentDataTableAction) => {
  const {
    isOpen: isChangeStatusOpen,
    onOpen: onOpenChangeStatus,
    onToggle: onToggleChangeStatus,
  } = useDisclosure();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="document-table-action-btn">
          <MoreHorizontal className="text-muted-foreground h-5 w-5" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-52" align="start" forceMount>
          <DropdownMenuLabel>Hoạt động</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onOpenChangeStatus}>
            <PencilRuler className="mr-2 h-4 w-4" /> Thay đổi trạng thái
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/admin/student/${student.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/admin/student/${student.id}/payment/create`}>
              <HandCoins className="mr-2 h-4 w-4" /> Đóng tiền
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CalendarCheck className="mr-2 h-4 w-4" />
            Điểm danh
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isChangeStatusOpen && (
        <StudentChangeStatus
          open={isChangeStatusOpen}
          onOpenChange={onToggleChangeStatus}
          student={student}
        />
      )}
    </>
  );
};

export const StudentDataTable = ({ results }: IStudentTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isPending, startTransition] = React.useTransition();
  const updateSearchParams = useUpdateSearchParams();

  const columns = React.useMemo(() => {
    return [
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
            >
              {row.original.name}
            </a>
          );
        },
      },
      {
        header: 'Email',
        cell: ({ row }) => (
          <Badge variant="secondary">
            <span className="truncate md:max-w-[10rem]">{row.original.email || '-'}</span>
          </Badge>
        ),
      },
      {
        header: 'Số điện thoại',
        cell: ({ row }) => (
          <Badge variant="default">
            <span className="truncate md:max-w-[10rem]">{row.original.phone_number || '-'}</span>
          </Badge>
        ),
      },
      {
        header: 'Hoạt động',
        cell: ({ row }) => {
          return <StudentDataTableAction student={row.original} />;
        },
        size: 70,
      },
      {
        header: 'Mở rộng',
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
            <div className="flex items-center justify-between border-b py-3 pr-5 pl-2 last:border-b-0">
              <div className="flex flex-col gap-y-1">
                <span className="text-foreground/50 text-xs font-medium">Tên phụ huynh</span>
                <div>{row.original.parent_name || '-'}</div>
              </div>
              <div className="flex flex-col gap-y-1">
                <span className="text-foreground/50 text-xs font-medium">
                  Số điện thoại phụ huynh
                </span>
                <div>{row.original.parent_phone_number || '-'}</div>
              </div>
              <div className="flex max-w-[15%] flex-col gap-y-1">
                <span className="text-foreground/50 text-xs font-medium">Mô tả</span>
                <div className="line-clamp-2">{row.original.description || '-'}</div>
              </div>
              <div className="flex flex-col gap-y-1">
                <span className="text-foreground/50 text-xs font-medium">Ngày Sinh</span>
                <div>{row.original.birth_date || '-'}</div>
              </div>
              <div className="flex max-w-[15%] line-clamp-2 flex-col gap-y-1">
                <span className="text-foreground/50 text-xs font-medium truncate">Địa chỉ</span>
                <div className="line-clamp-2">{row.original.address || '-'}</div>
              </div>
              <div className="flex flex-col gap-y-1">
                <span className="text-foreground/50 text-xs font-medium">Ngày nhập học</span>
                <div>{row.original.start_date || '-'}</div>
              </div>
              <div className="flex justify-center items-center" />
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
