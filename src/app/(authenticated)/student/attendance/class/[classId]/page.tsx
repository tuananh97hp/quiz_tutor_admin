import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import React from 'react';
import { getCurrentAccessToken } from '@/utils/session';
import { notFound } from 'next/navigation';
import ClassService from '@/services/ClassService';
import { StudentAttendanceForm } from '@/components/(authenticated)/student/attendance/student-attendance-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | Điểm Danh Lớp',
};

interface IPageParams {
  classId: string;
}

interface IAttendancePageProps {
  params: IPageParams;
}

const CreateAttendancePage = async ({ params }: IAttendancePageProps) => {
  const { classId } = params;
  const accessToken = await getCurrentAccessToken();

  if (!accessToken) return notFound();
  let classItem;
  try {
    classItem = await ClassService.studentMeGetClassDetail(accessToken, Number(classId));
  } catch (e) {
    return notFound();
  }

  if (!classItem) return notFound();

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-8">
        <div className="flex flex-row items-center">
          <Avatar className="dark:border-border mr-3 h-12 w-12 border-2 border-solid border-white">
            <AvatarFallback className="text-xs text-gray-400">AT</AvatarFallback>
          </Avatar>

          <h1 className="text-4xl font-semibold">Điểm Danh</h1>
        </div>
        <div className="flex w-full flex-col gap-4 p-1">
          <StudentAttendanceForm classItem={classItem.data} />
        </div>
      </div>
    </div>
  );
};

export default CreateAttendancePage;
