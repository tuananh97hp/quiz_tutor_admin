import { Metadata } from 'next';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserRoundPlus, LayoutGrid, LayoutList } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InputSearch } from '@/components/shared/input-search';
import { AttendanceEmptyState } from '@/components/(admin)/attendance/attendance-empty-state';
import { DatePickerSearch } from '@/components/ui/date-picker-search';
import { getCurrentAccessToken } from '@/utils/session';
import AttendanceService from '@/services/AttendanceService';
import { AttendanceClassList } from '@/components/(admin)/attendance/attendance-class-list';

export const metadata: Metadata = {
  title: 'Attendance Page',
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
    result = await AttendanceService.getClassesAttendance(accessToken, { date, search });
  }

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
      <div className="mt-12 flex flex-wrap items-center justify-between gap-x-4 gap-y-8">
        <div className="flex flex-row items-center">
          <Avatar className="dark:border-border mr-3 h-12 w-12 border-2 border-solid border-white">
            <AvatarFallback className="text-xs text-gray-400">SL</AvatarFallback>
          </Avatar>

          <h1 className="text-4xl font-semibold">Attendance List</h1>
        </div>
        <Button>
          <UserRoundPlus /> Create Attendance
        </Button>
        <div className="flex w-full flex-col gap-4 overflow-hidden p-1">
          <div className="-m-1 flex flex-wrap gap-x-4 gap-y-4 overflow-hidden p-1">
            <Tabs defaultValue="grid" className="w-full">
              <div className="flex justify-end w-full">
                <TabsList>
                  <TabsTrigger value="grid" className="rounded-xl p-2">
                    <LayoutGrid className="h-4 w-4 font-bold" />
                  </TabsTrigger>
                  <TabsTrigger value="list" className="rounded-xl p-2">
                    <LayoutList className="h-4 w-4 font-bold" />
                  </TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
            <div className="-m-1 flex w-full flex-wrap gap-2 p-1">
              <div className="flex-grow basis-64">
                <InputSearch initialValue={searchParams.search || ''} label="classes" />
              </div>
              <div className="flex-grow basis-64">
                <DatePickerSearch />
              </div>
              <div className="flex-grow basis-64" />
              <div className="flex-grow basis-64" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {result?.data.length ? <AttendanceClassList results={result} /> : <AttendanceEmptyState />}
      </div>
    </div>
  );
};

export default AttendancePage;
