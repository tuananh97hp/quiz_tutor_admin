import { Metadata } from 'next';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BookCheck, CircleX, BookPlus, List } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TabButton from '@/components/shared/tab-button';
import Link from 'next/link';
import { getParamHref } from '@/utils/constants/handle';
import { CLASS_STATUS } from '@/utils/constants';
import { InputSearch } from '@/components/shared/input-search';
import { ClassDataTable } from '@/components/(admin)/class/class-data-table';
import { EmptyClassState } from '@/components/(admin)/class/empty-class-state';

export const metadata: Metadata = {
  title: 'Class Page',
};

interface ISearchParams {
  status?: string;
  search?: string;
}

interface IClassPageProps {
  searchParams: ISearchParams;
}

const STATUS_TABS = [
  {
    value: CLASS_STATUS.OPEN,
    label: 'Open',
    icon: BookCheck,
    color: 'text-green-500',
  },
  {
    value: CLASS_STATUS.CLOSE,
    label: 'Close',
    icon: CircleX,
    color: 'text-red-500',
  },
  {
    value: 'all',
    label: 'All',
    icon: List,
    color: 'text-gray-500',
  },
];

const ClassPage = ({ searchParams = {} }: IClassPageProps) => {
  const { status = 'open' } = searchParams;

  const getTabHref = (tab: string) => {
    return getParamHref('/class', searchParams, 'status', tab);
  };
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
      <div className="mt-12 flex flex-wrap items-center justify-between gap-x-4 gap-y-8">
        <div className="flex flex-row items-center">
          <Avatar className="dark:border-border mr-3 h-12 w-12 border-2 border-solid border-white">
            <AvatarFallback className="text-xs text-gray-400">CL</AvatarFallback>
          </Avatar>

          <h1 className="text-4xl font-semibold">Class List</h1>
        </div>
        <Button>
          <BookPlus /> Create Class
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
            </Tabs>
            <div className="-m-1 flex w-full flex-wrap gap-2 p-1">
              <div className="flex-grow basis-64">
                <InputSearch initialValue={searchParams.search || ''} label="classes" />
              </div>
              <div className="flex-grow basis-64" />
              <div className="flex-grow basis-64" />
              <div className="flex-grow basis-64" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <ClassDataTable
          results={{ data: [], count: 0, currentPage: 0, perPage: 20, totalPages: 0 }}
        />
        <EmptyClassState status={status} />
      </div>
    </div>
  );
};

export default ClassPage;
