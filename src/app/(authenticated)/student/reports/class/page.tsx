import React from 'react';
import { SettingsHeader } from '@/components/(authenticated)/common/sub-layout/header';
import Link from 'next/link';
import { BookCheck, CircleX, List } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TabButton from '@/components/shared/tab-button';
import { IClassSummary } from '@/types/models';
import { ClassEmptyState } from '@/components/(authenticated)/admin/class/class-empty-state';
import { getCurrentAccessToken } from '@/utils/session';
import { getParamHref } from '@/utils/handle';
import classService from '@/services/ClassService';
import { CLASS_STATUS } from '@/utils/constants';
import { StudentReportClassDataTable } from '@/components/(authenticated)/student/reports/class/class-data-table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Học Sinh | Danh Sách Lớp Học',
};

interface ISearchParams {
  status?: string;
  search?: string;
  page?: string;
  perPage?: string;
}

interface IPageProps {
  searchParams: ISearchParams;
}

const STATUS_TABS = [
  {
    value: CLASS_STATUS.OPEN,
    label: 'Đang mở',
    icon: BookCheck,
    color: 'text-green-500',
    summary_key: 'open_classes',
  },
  {
    value: CLASS_STATUS.CLOSE,
    label: 'Đã đóng',
    icon: CircleX,
    color: 'text-red-500',
    summary_key: 'close_classes',
  },
  {
    value: 'all',
    label: 'Tất cả',
    icon: List,
    color: 'text-gray-500',
    summary_key: 'total_classes',
  },
];
const StudentReportsClassPage = async ({ searchParams }: IPageProps) => {
  const { status = 'open', search = '', perPage = '10', page = '1' } = searchParams;
  const accessToken = await getCurrentAccessToken();

  const getTabHref = (tab: string) => {
    return getParamHref('/student/reports/class', searchParams, 'status', tab);
  };

  let result;
  let resultSummary: IClassSummary = {
    open_classes: 0,
    close_classes: 0,
    total_classes: 0,
  };
  if (accessToken) {
    result = await classService.studentMeGetClasses(accessToken, {
      status,
      search,
      page,
      per_page: perPage,
    });
    resultSummary = await classService.studentMeGetClassesSummary(accessToken);
  }

  return (
    <div>
      <SettingsHeader
        title="Danh Sách Lớp"
        subtitle="Bạn có thể xem danh sách lớp học của mình trước đó."
      />
      <div className="mx-auto w-full max-w-screen-2xl">
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-8">
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
                          count={resultSummary[tab.summary_key as keyof IClassSummary] || 0}
                          color={tab.color}
                        />
                      </Link>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="mt-4">
          {result?.data.length ? (
            <StudentReportClassDataTable results={result} />
          ) : (
            <ClassEmptyState status={status} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentReportsClassPage;
