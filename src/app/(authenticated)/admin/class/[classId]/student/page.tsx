import Link from 'next/link';
import { ChevronLeftCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import React from 'react';
import { getCurrentAccessToken } from '@/utils/session';
import { notFound } from 'next/navigation';
import ClassService from '@/services/ClassService';
import { ClassStudentForm } from '@/components/(authenticated)/admin/class/class-student-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | Quản Lý Học Sinh Lớp',
};

interface IPageParams {
  classId: string;
}

interface IClassStudentPageProps {
  params: IPageParams;
}

const ClassStudentPage = async ({ params }: IClassStudentPageProps) => {
  const { classId } = params;
  const accessToken = await getCurrentAccessToken();

  if (!accessToken) return notFound();
  let classItem;
  try {
    classItem = await ClassService.getClassDetail(accessToken, Number(classId));
  } catch (e) {
    return notFound();
  }

  if (!classItem) return notFound();

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
      <Link
        href="/admin/class"
        className="text-primary-700 hover:text-primary-600 hover:text-foreground hover:bg-muted/10 border-muted-background inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-all"
      >
        <ChevronLeftCircle className="mr-2 inline-block h-5 w-5" />
        Danh Sách Lớp
      </Link>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-8">
        <div className="flex flex-row items-center">
          <Avatar className="dark:border-border mr-3 h-12 w-12 border-2 border-solid border-white">
            <AvatarFallback className="text-xs text-gray-400">SC</AvatarFallback>
          </Avatar>

          <h1 className="text-4xl font-semibold">Quản Lý Học Sinh Lớp</h1>
        </div>
        <div className="flex w-full flex-col gap-4 p-1">
          <ClassStudentForm classItem={classItem.data} />
        </div>
      </div>
    </div>
  );
};

export default ClassStudentPage;
