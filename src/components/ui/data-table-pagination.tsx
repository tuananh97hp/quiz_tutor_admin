import type { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { match } from 'ts-pattern';

import { Button } from './button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;

  /**
   * The type of information to show on the left hand side of the pagination.
   *
   * Defaults to 'VisibleCount'.
   */
  additionalInformation?: 'SelectedCount' | 'VisibleCount' | 'None';
}

export function DataTablePagination<TData>({
  table,
  additionalInformation = 'VisibleCount',
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-4 px-2">
      <div className="text-muted-foreground flex-1 text-sm">
        {match(additionalInformation)
          .with('SelectedCount', () => (
            <span>
              {table.getFilteredSelectedRowModel().rows.length} of{' '}
              {table.getFilteredRowModel().rows.length} row(s) đã chọn.
            </span>
          ))
          .with('VisibleCount', () => {
            const visibleRows = table.getFilteredRowModel().rows.length;
            return <span data-testid="data-table-count">Hiển thị {visibleRows} kết quả.</span>;
          })
          .with('None', () => null)
          .exhaustive()}
      </div>

      <div className="flex items-center gap-x-2">
        <p className="whitespace-nowrap text-sm font-medium">Số lượng trong trang</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 lg:gap-x-8">
        <div className="flex items-center text-sm font-medium md:justify-center">
          Trang {table.getState().pagination.pageIndex + 1} của {table.getPageCount() || 1}
        </div>

        <div className="flex items-center gap-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Trang đầu tiên</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Trang trước</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Trang kế</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Trang cuối</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
