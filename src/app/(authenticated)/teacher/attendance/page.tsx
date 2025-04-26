import React from 'react';
import { Metadata } from 'next';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { InputSearch } from '@/components/shared/input-search';
import { getCurrentAccessToken } from '@/utils/session';
import ClassService from '@/services/ClassService';
import { AttendanceClassEmptyState } from '@/components/(authenticated)/admin/attendance/attendance-class-empty-state';
import { TeacherAttendanceClassList } from '@/components/(authenticated)/teacher/attendance/teacher-attendance-class-list';

export const metadata: Metadata = {
  title: 'Giáo Viên | Danh Sách Điểm Danh',
};

interface ISearchParams {
  search?: string;
  date?: string;
}

interface IAttendancePageProps {
  searchParams: ISearchParams;
}

const AttendancePage = async ({ searchParams = {} }: IAttendancePageProps) => {
  const { date = '', search = '' } = searchParams;
  const accessToken = await getCurrentAccessToken();

  let result;
  if (accessToken) {
    result = await ClassService.teacherMeGetClassesToday(accessToken, { date, search });
  }

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
      <div className="mt-12 flex flex-wrap items-center justify-between gap-x-4 gap-y-8">
        <div className="flex flex-row items-center">
          <Avatar className="dark:border-border mr-3 h-12 w-12 border-2 border-solid border-white">
            <AvatarFallback className="text-xs text-gray-400">SL</AvatarFallback>
          </Avatar>

          <h1 className="text-4xl font-semibold">Danh Sách Điểm Danh</h1>
        </div>
        <div className="flex w-full flex-col gap-4 overflow-hidden p-1">
          <div className="-m-1 flex flex-wrap gap-x-4 gap-y-4 overflow-hidden p-1">
            <div className="-m-1 flex w-full flex-wrap gap-2 p-1">
              <div className="flex-grow basis-64">
                <InputSearch initialValue={searchParams.search || ''} label="lớp" />
              </div>
              <div className="flex-grow basis-64" />
              <div className="flex-grow basis-64" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {result?.data.length ? (
          <TeacherAttendanceClassList results={result} />
        ) : (
          <AttendanceClassEmptyState />
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
