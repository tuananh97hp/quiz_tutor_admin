import React from 'react';
import AttendanceService from '@/services/AttendanceService';
import { SettingsHeader } from '@/components/(authenticated)/common/sub-layout/header';
import { getCurrentAccessToken } from '@/utils/session';
import { DatePickerSearch } from '@/components/ui/date-picker-search';
import { AttendanceEmptyState } from '@/components/(authenticated)/admin/attendance/attendance-empty-state';
import { TeacherReportAttendanceDataTable } from '@/components/(authenticated)/teacher/reports/attendance/attendance-data-table';

interface ISearchParams {
  start_date?: string;
  end_date?: string;
  search?: string;
  status?: string;
  page?: string;
  perPage?: string;
}

interface IPageProps {
  searchParams: ISearchParams;
}

const StudentReportsAttendancePage = async ({ searchParams }: IPageProps) => {
  const { start_date = '', end_date = '', search = '', perPage = '10', page = '1' } = searchParams;
  const accessToken = await getCurrentAccessToken();

  let result;
  if (accessToken) {
    result = await AttendanceService.teacherMeGetAttendance(accessToken, {
      start_date,
      end_date,
      search,
      page,
      per_page: perPage,
    });
  }
  return (
    <div>
      <SettingsHeader
        title="Điểm Danh"
        subtitle="Tại đây bạn có thể xem thông tin các buổi đã học của mình."
      />
      <div className="mx-auto w-full max-w-screen-2xl">
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-8">
          <div className="flex w-full flex-col gap-4 overflow-hidden p-1">
            <div className="-m-1 flex justify-between gap-x-4 gap-y-6 overflow-hidden p-1">
              <div className="flex gap-3">
                <DatePickerSearch />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          {result?.data.length ? (
            <TeacherReportAttendanceDataTable results={result} />
          ) : (
            <AttendanceEmptyState status={'present'} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentReportsAttendancePage;
