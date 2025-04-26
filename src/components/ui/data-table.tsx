'use client';

import React, { useMemo } from 'react';
import type {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
  Table as TTable,
  Updater,
  VisibilityState,
  Row,
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Skeleton } from './skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';

export type DataTableChildren<TData> = (_table: TTable<TData>) => React.ReactNode;
export type { ColumnDef as DataTableColumnDef } from '@tanstack/react-table';

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  columnVisibility?: VisibilityState;
  data: TData[];
  perPage?: number;
  currentPage?: number;
  totalPages?: number;
  onPaginationChange?: (_page: number, _perPage: number) => void;
  onClearFilters?: () => void;
  hasFilters?: boolean;
  children?: DataTableChildren<TData>;
  skeleton?: {
    enable: boolean;
    rows: number;
    component?: React.ReactNode;
  };
  error?: {
    enable: boolean;
    component?: React.ReactNode;
  };
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  // New prop: a callback to render a sub-component for an expanded row
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  columnVisibility,
  data,
  error,
  perPage,
  currentPage,
  totalPages,
  skeleton,
  hasFilters,
  onClearFilters,
  onPaginationChange,
  sorting,
  onSortingChange,
  children,
  renderSubComponent,
}: DataTableProps<TData, TValue>) {
  const pagination = useMemo<PaginationState>(() => {
    if (currentPage !== undefined && perPage !== undefined) {
      return {
        pageIndex: currentPage - 1,
        pageSize: perPage,
      };
    }

    return {
      pageIndex: 0,
      pageSize: 0,
    };
  }, [currentPage, perPage]);

  const manualPagination = Boolean(currentPage !== undefined && totalPages !== undefined);

  const onTablePaginationChange = (updater: Updater<PaginationState>) => {
    if (typeof updater === 'function') {
      const newState = updater(pagination);
      onPaginationChange?.(newState.pageIndex + 1, newState.pageSize);
    } else {
      onPaginationChange?.(updater.pageIndex + 1, updater.pageSize);
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination: manualPagination ? pagination : undefined,
      columnVisibility,
      sorting,
    },
    onSortingChange,
    getSortedRowModel: getSortedRowModel(),
    manualPagination,
    pageCount: totalPages,
    onPaginationChange: onTablePaginationChange,
  });

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{
                          width: `${cell.column.getSize()}px`,
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <tr>
                      {/* 2nd row: single cell spanning all columns */}
                      <td colSpan={row.getVisibleCells().length}>
                        {renderSubComponent && renderSubComponent({ row })}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : error?.enable ? (
              <TableRow>
                {error.component ?? (
                  <TableCell colSpan={columns.length} className="h-32 text-center">
                    Something went wrong.
                  </TableCell>
                )}
              </TableRow>
            ) : skeleton?.enable ? (
              Array.from({ length: skeleton.rows }).map((_, i) => (
                <TableRow key={`skeleton-row-${i}`}>{skeleton.component ?? <Skeleton />}</TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center">
                  <p>Không tìm thấy kết quả</p>
                  {hasFilters && onClearFilters !== undefined && (
                    <button
                      onClick={() => onClearFilters()}
                      className="text-foreground mt-1 text-sm"
                    >
                      Clear filters
                    </button>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {children && <div className="mt-8 w-full">{children(table)}</div>}
    </>
  );
}
