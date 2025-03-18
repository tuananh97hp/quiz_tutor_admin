'use client';

import React from 'react';
import { IClass } from '@/types/models';
import { ListFindResultSet } from '@/types/find-result-set';
import { AttendanceClassItem } from '@/components/(admin)/attendance/attendance-class-item';

export type IClassDataTableResult = ListFindResultSet<IClass>;

interface IClassTableProps {
  results: IClassDataTableResult;
}
export const AttendanceClassList = ({ results }: IClassTableProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
      {results.data.map((classItem) => (
        <AttendanceClassItem key={classItem.id} classItem={classItem} />
      ))}
    </div>
  );
};
