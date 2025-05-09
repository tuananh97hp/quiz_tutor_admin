'use client';

import React from 'react';
import { DataTable, DataTableColumnDef } from '@/components/ui/data-table';
import type { OnChangeFn, SortingState } from '@tanstack/react-table';
import { IPayment } from '@/types/models';
import { FindResultSet } from '@/types/find-result-set';
import { useUpdateSearchParams } from '@/hooks/use-update-search-params';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import {
  CalendarCheck,
  Edit,
  HandCoins,
  Loader,
  MoreHorizontal,
  PencilRuler,
  Trash,
} from 'lucide-react';
import { formatMoney } from '@/utils/handle';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableExpand } from '@/components/shared/table-expand';

export type IPaymentDataTableResult = FindResultSet<IPayment>;

interface IPaymentTableProps {
  results: IPaymentDataTableResult;
}
interface IPaymentDataTableAction {
  payment: IPayment;
}

const PaymentDataTableAction = ({ payment }: IPaymentDataTableAction) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger data-testid="document-table-action-btn">
        <MoreHorizontal className="text-muted-foreground h-5 w-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52" align="start" forceMount>
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className="mr-2 h-4 w-4" /> Xoá
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export const PaymentDataTable = ({ results }: IPaymentTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isPending, startTransition] = React.useTransition();
  const updateSearchParams = useUpdateSearchParams();

  const columns = React.useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: 'Mã đóng tiền',
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
        header: 'Tên học sinh',
        cell: ({ row }) => {
          return (
            <a
              href="#"
              className="truncate md:max-w-[10rem] whitespace-normal line-clamp-1 hover:underline underline-offset-2 font-bold"
            >
              {row.original.name}
            </a>
          );
        },
      },
      {
        header: 'Mô tả',
        cell: ({ row }) => {
          return <div className="truncate md:max-w-[10rem]">{row.original.desc}</div>;
        },
      },
      {
        header: 'Số tiền',
        cell: ({ row }) => {
          return <Badge variant="warning">{formatMoney(row.original.money)}đ</Badge>;
        },
      },
      {
        header: 'Hoạt động',
        cell: ({ row }) => {
          return <PaymentDataTableAction payment={row.original} />;
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
            <div className="flex items-center gap-x-20 border-b py-3 pr-5 pl-10 last:border-b-0">
              <div className="flex flex-col gap-y-1">
                <span className="text-foreground/50 text-xs font-medium">Ngày đóng tiền</span>
                <div className="text-foreground/50 text-sm font-medium">
                  {row.original.payment_date || '-'}
                </div>
              </div>
              <div className="flex flex-col gap-y-1">
                <span className="text-foreground/50 text-xs font-medium">Số lượng buổi học</span>
                <div className="text-foreground/50 text-sm font-medium">
                  {row.original.payment_attendances_count || '-'}
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
