import React from 'react';
import { SettingsHeader } from '@/components/(authenticated)/common/sub-layout/header';
import { getCurrentAccessToken } from '@/utils/session';
import { getParamHref } from '@/utils/handle';
import { IAttendanceSummary } from '@/types/models';
import AttendanceService from '@/services/AttendanceService';
import { ATTENDANCE_STATUS } from '@/utils/constants';
import { List, UserRoundCheck, UserRoundX } from 'lucide-react';
import Link from 'next/link';
import { DatePickerSearch } from '@/components/ui/date-picker-search';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TabButton from '@/components/shared/tab-button';
import { AttendanceEmptyState } from '@/components/(authenticated)/admin/attendance/attendance-empty-state';
import { StudentReportAttendanceDataTable } from '@/components/(authenticated)/student/reports/attendance/attendance-data-table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Học Sinh | Danh Sách Điểm Danh',
};

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

const STATUS_TABS = [
  {
    value: ATTENDANCE_STATUS.ABSENT,
    label: 'Vắng',
    icon: UserRoundX,
    color: 'text-red-500',
    summary_key: 'absent_attendances',
  },
  {
    value: ATTENDANCE_STATUS.PRESENT,
    label: 'Đi học',
    icon: UserRoundCheck,
    color: 'text-green-500',
    summary_key: 'present_attendances',
  },
  {
    value: 'all',
    label: 'Tất cả',
    icon: List,
    color: 'text-gray-500',
    summary_key: 'total_attendances',
  },
];

const StudentReportsAttendancePage = async ({ searchParams }: IPageProps) => {
  const {
    start_date = '',
    end_date = '',
    status = 'absent',
    search = '',
    perPage = '10',
    page = '1',
  } = searchParams;
  const accessToken = await getCurrentAccessToken();

  const getTabHref = (tab: string) => {
    return getParamHref('/student/reports/attendance', searchParams, 'status', tab);
  };

  let result;
  let resultSummary: IAttendanceSummary = {
    present_attendances: 0,
    absent_attendances: 0,
    total_attendances: 0,
  };
  if (accessToken) {
    result = await AttendanceService.studentMeGetAttendance(accessToken, {
      status,
      start_date,
      end_date,
      search,
      page,
      per_page: perPage,
    });
    resultSummary = await AttendanceService.studentMeGetAttendanceSummary(accessToken, {
      start_date,
      end_date,
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
              <Tabs defaultValue={status}>
                <TabsList className="h-10">
                  {STATUS_TABS.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} className="min-w-[60px]" asChild>
                      <Link href={getTabHref(tab.value)}>
                        <TabButton
                          icon={tab.icon}
                          label={tab.label}
                          count={resultSummary[tab.summary_key as keyof IAttendanceSummary] || 0}
                          color={tab.color}
                        />
                      </Link>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <div className="flex gap-3">
                <DatePickerSearch />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          {result?.data.length ? (
            <StudentReportAttendanceDataTable results={result} />
          ) : (
            <AttendanceEmptyState status={status} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentReportsAttendancePage;
