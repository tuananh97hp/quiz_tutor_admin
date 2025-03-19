import { Metadata } from 'next';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserRoundPlus, CircleCheck, Loader, UserRoundX, List } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TabButton from '@/components/shared/tab-button';
import Link from 'next/link';
import { getParamHref } from '@/utils/handle';
import { STUDENT_STATUS } from '@/utils/constants';
import { InputSearch } from '@/components/shared/input-search';
import { StudentDataTable } from '@/components/(admin)/students/student-data-table';
import { EmptyStudentState } from '@/components/(admin)/students/empty-student-state';
import { getCurrentAccessToken } from '@/utils/session';
import StudentService from '@/services/StudentService';
import { IStudentSummary } from '@/types/models';

export const metadata: Metadata = {
  title: 'Student Page',
};

interface ISearchParams {
  status?: string;
  search?: string;
}

interface IStudentPageProps {
  searchParams: ISearchParams;
}

const STATUS_TABS = [
  {
    value: STUDENT_STATUS.PROCESSING,
    label: 'Processing',
    icon: Loader,
    color: 'text-blue-500',
    summary_key: 'processing_students',
  },
  {
    value: STUDENT_STATUS.ACTIVE,
    label: 'Active',
    icon: CircleCheck,
    color: 'text-green-500',
    summary_key: 'active_students',
  },
  {
    value: STUDENT_STATUS.INACTIVE,
    label: 'Inactive',
    icon: UserRoundX,
    color: 'text-red-500',
    summary_key: 'inactive_students',
  },
  {
    value: 'all',
    label: 'All',
    icon: List,
    color: 'text-gray-500',
    summary_key: 'total_students',
  },
];

const StudentPage = async ({ searchParams = {} }: IStudentPageProps) => {
  const { status = 'active', search = '' } = searchParams;
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
    result = await StudentService.fetchDataStudent(accessToken, { status, search });
    resultSummary = await StudentService.getStudentSummary(accessToken);
  }
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
      <div className="mt-12 flex flex-wrap items-center justify-between gap-x-4 gap-y-8">
        <div className="flex flex-row items-center">
          <Avatar className="dark:border-border mr-3 h-12 w-12 border-2 border-solid border-white">
            <AvatarFallback className="text-xs text-gray-400">SL</AvatarFallback>
          </Avatar>

          <h1 className="text-4xl font-semibold">Student List</h1>
        </div>
        <Button asChild>
          <Link href="/student/create">
            <UserRoundPlus /> Create Student
          </Link>
        </Button>
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
                <InputSearch initialValue={searchParams.search || ''} label="students" />
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
          <EmptyStudentState status={status} />
        )}
      </div>
    </div>
  );
};

export default StudentPage;
