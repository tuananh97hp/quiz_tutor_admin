import { Metadata } from 'next';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserRoundPlus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TabButton from '@/components/shared/tab-button';
import Link from 'next/link';
import { getParamHref } from '@/utils/constants/handle';
import { STUDENT_STATUS } from '@/utils/constants';

export const metadata: Metadata = {
  title: 'Student Page',
};

interface ISearchParams {
  status?: string;
}

interface IStudentPageProps {
  searchParams: ISearchParams;
}

const STATUS_TABS = [
  {
    value: STUDENT_STATUS.ACTIVE,
    label: 'Active',
    icon: UserRoundPlus,
    color: 'text-green-500',
  },
  {
    value: STUDENT_STATUS.PROCESSING,
    label: 'Processing',
    icon: UserRoundPlus,
    color: 'text-blue-500',
  },
  {
    value: STUDENT_STATUS.INACTIVE,
    label: 'Inactive',
    icon: UserRoundPlus,
    color: 'text-red-500',
  },
  {
    value: 'all',
    label: 'All',
    icon: UserRoundPlus,
    color: 'text-red-500',
  },
];

const StudentPage = ({ searchParams = {} }: IStudentPageProps) => {
  const { status = 'active' } = searchParams;

  const getTabHref = (tab: string) => {
    return getParamHref('student', searchParams, 'status', tab);
  };
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
      <div className="mt-12 flex flex-wrap items-center justify-between gap-x-4 gap-y-8">
        <div className="flex flex-row items-center">
          <Avatar className="dark:border-border mr-3 h-12 w-12 border-2 border-solid border-white">
            <AvatarFallback className="text-xs text-gray-400">SL</AvatarFallback>
          </Avatar>

          <h1 className="text-4xl font-semibold">Student List</h1>
        </div>
        <Button>
          <UserRoundPlus /> Create Student
        </Button>
        <div className="flex w-full flex-col gap-4 overflow-hidden p-1">
          <div className="-m-1 flex flex-wrap gap-x-4 gap-y-6 overflow-hidden p-1">
            <Tabs defaultValue={status}>
              <TabsList className="h-10">
                {STATUS_TABS.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="min-w-[60px]" asChild>
                    <Link href={getTabHref(tab.value)}>
                      <TabButton icon={tab.icon} label={tab.label} count={2} color={tab.color} />
                    </Link>
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="active">Make changes to your account here.</TabsContent>
              <TabsContent value="password">Change your password here.</TabsContent>
              <TabsContent value="all">
                Change your password here make changes to your account here.
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
