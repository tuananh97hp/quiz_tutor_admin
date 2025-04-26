'use client';

import React from 'react';
import { IClass } from '@/types/models';
import { ListFindResultSet } from '@/types/find-result-set';
import { TeacherAttendanceClassItem } from '@/components/(authenticated)/teacher/attendance/teacher-attendance-class-item';

export type IClassDataTableResult = ListFindResultSet<IClass>;

interface ITeacherAttendanceClassListProps {
  results: IClassDataTableResult;
}
export const TeacherAttendanceClassList = ({ results }: ITeacherAttendanceClassListProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
      {results.data.map((classItem) => (
        <TeacherAttendanceClassItem key={classItem.id} classItem={classItem} />
      ))}
    </div>
  );
};
