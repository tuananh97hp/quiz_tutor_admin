import { Metadata } from 'next';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserRoundX, UserRoundCheck, ChevronLeftCircle, List } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TabButton from '@/components/shared/tab-button';
import Link from 'next/link';
import { getParamHref } from '@/utils/handle';
import { ATTENDANCE_STATUS } from '@/utils/constants';
import { InputSearch } from '@/components/shared/input-search';
import { getCurrentAccessToken } from '@/utils/session';
import { IAttendanceSummary } from '@/types/models';
import React from 'react';
import { DatePickerSearch } from '@/components/ui/date-picker-search';
import AttendanceService from '@/services/AttendanceService';
import { AttendanceDataTable } from '@/components/(authenticated)/admin/attendance/attendance-data-table';
import { AttendanceEmptyState } from '@/components/(authenticated)/admin/attendance/attendance-empty-state';

export const metadata: Metadata = {
  title: 'Admin | Danh Sách Điểm Danh Học Sinh',
};

interface ISearchParams {
  date?: string;
  search?: string;
  status?: string;
  page?: string;
  perPage?: string;
}

interface IClassPageProps {
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
    label: 'All',
    icon: List,
    color: 'text-gray-500',
    summary_key: 'total_attendances',
  },
];

const AttendanceStudentPage = async ({ searchParams = {} }: IClassPageProps) => {
  const { date = '', status = 'absent', search = '', perPage = '10', page = '1' } = searchParams;
  const accessToken = await getCurrentAccessToken();

  const getTabHref = (tab: string) => {
    return getParamHref('/admin/attendance/student', searchParams, 'status', tab);
  };

  let result;
  let resultSummary: IAttendanceSummary = {
    present_attendances: 0,
    absent_attendances: 0,
    total_attendances: 0,
  };
  if (accessToken) {
    result = await AttendanceService.fetchDataAttendance(accessToken, {
      status,
      date,
      search,
      page,
      per_page: perPage,
    });
    resultSummary = await AttendanceService.getAttendanceSummary(accessToken, { date });
  }

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
      <Link
        href="/admin/attendance"
        className="text-primary-700 hover:text-primary-600 hover:text-foreground hover:bg-muted/10 border-muted-background inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-all"
      >
        <ChevronLeftCircle className="mr-2 inline-block h-5 w-5" />
        Danh Sách Điểm Danh
      </Link>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-8">
        <div className="flex flex-row items-center">
          <Avatar className="dark:border-border mr-3 h-12 w-12 border-2 border-solid border-white">
            <AvatarFallback className="text-xs text-gray-400">SA</AvatarFallback>
          </Avatar>

          <h1 className="text-4xl font-semibold">Học Sinh Điểm Danh</h1>
        </div>
        <div className="flex gap-3">
          <DatePickerSearch />
        </div>
        <div className="flex w-full flex-col gap-4 overflow-hidden p-1">
          <div className="-m-1 flex flex-wrap gap-x-4 gap-y-6 overflow-hidden p-1">
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
            <div className="-m-1 flex w-full flex-wrap gap-2 p-1">
              <div className="flex-grow basis-64">
                <InputSearch initialValue={searchParams.search || ''} label="học sinh" />
              </div>
              <div className="flex-grow basis-64" />
              <div className="flex-grow basis-64" />
              <div className="flex-grow basis-64" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {result?.data.length ? (
          <AttendanceDataTable results={result} />
        ) : (
          <AttendanceEmptyState status={status} />
        )}
      </div>
    </div>
  );
};

export default AttendanceStudentPage;
