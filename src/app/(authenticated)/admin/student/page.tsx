import { Metadata } from 'next';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  UserRoundPlus,
  CircleCheck,
  Loader,
  UserRoundX,
  List,
  FileUp,
  FileDown,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TabButton from '@/components/shared/tab-button';
import Link from 'next/link';
import { getParamHref } from '@/utils/handle';
import { STUDENT_STATUS } from '@/utils/constants';
import { InputSearch } from '@/components/shared/input-search';
import { StudentDataTable } from '@/components/(authenticated)/admin/students/student-data-table';
import { StudentEmptyState } from '@/components/(authenticated)/admin/students/student-empty-state';
import { getCurrentAccessToken } from '@/utils/session';
import StudentService from '@/services/StudentService';
import { IStudentSummary } from '@/types/models';
import React from 'react';

export const metadata: Metadata = {
  title: 'Admin | Danh Sách Học Sinh',
};

interface ISearchParams {
  status?: string;
  search?: string;
  page?: string;
  perPage?: string;
}

interface IStudentPageProps {
  searchParams: ISearchParams;
}

const STATUS_TABS = [
  {
    value: STUDENT_STATUS.PROCESSING,
    label: 'Chờ xử lý',
    icon: Loader,
    color: 'text-blue-500',
    summary_key: 'processing_students',
  },
  {
    value: STUDENT_STATUS.ACTIVE,
    label: 'Hoạt động',
    icon: CircleCheck,
    color: 'text-green-500',
    summary_key: 'active_students',
  },
  {
    value: STUDENT_STATUS.INACTIVE,
    label: 'Đã dừng',
    icon: UserRoundX,
    color: 'text-red-500',
    summary_key: 'inactive_students',
  },
  {
    value: 'all',
    label: 'Tất cả',
    icon: List,
    color: 'text-gray-500',
    summary_key: 'total_students',
  },
];

const StudentPage = async ({ searchParams = {} }: IStudentPageProps) => {
  const { status = 'active', search = '', perPage = '10', page = '1' } = searchParams;
  const accessToken = await getCurrentAccessToken();

  const getTabHref = (tab: string) => {
    return getParamHref('student', searchParams, 'status', tab);
  };

  let result;
  let resultSummary: IStudentSummary = {
    processing_students: 0,
    active_students: 0,
    inactive_students: 0,
    total_students: 0,
  };
  if (accessToken) {
    result = await StudentService.fetchDataStudent(accessToken, {
      status,
      search,
      page,
      per_page: perPage,
    });
    resultSummary = await StudentService.getStudentSummary(accessToken);
  }
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
      <div className="mt-12 flex flex-wrap items-center justify-between gap-x-4 gap-y-8">
        <div className="flex flex-row items-center">
          <Avatar className="dark:border-border mr-3 h-12 w-12 border-2 border-solid border-white">
            <AvatarFallback className="text-xs text-gray-400">SL</AvatarFallback>
          </Avatar>

          <h1 className="text-4xl font-semibold">Danh Sách Học Sinh</h1>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/admin/student/create">
              <UserRoundPlus /> Thêm Mới
            </Link>
          </Button>
          <Button asChild variant="import">
            <Link href={'/admin/student/import-excel'}>
              <FileUp /> Import
            </Link>
          </Button>
          <Button asChild variant="export">
            <Link href={'/admin/student/export-excel'}>
              <FileDown /> Export
            </Link>
          </Button>
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
                        count={resultSummary[tab.summary_key as keyof IStudentSummary]}
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
          <StudentDataTable results={result} />
        ) : (
          <StudentEmptyState status={status} />
        )}
      </div>
    </div>
  );
};

export default StudentPage;
