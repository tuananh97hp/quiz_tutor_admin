import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeftCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StudentForm } from '@/components/(admin)/students/student-form';
import StudentService from '@/services/StudentService';
import { getCurrentAccessToken } from '@/utils/session';

interface IEditParams {
  studentId: string;
}

interface IEditStudentPageProps {
  params: IEditParams;
}
const EditStudentPage = async ({ params }: IEditStudentPageProps) => {
  const { studentId } = params;
  const accessToken = await getCurrentAccessToken();

  if (!accessToken) return notFound();
  let student;
  try {
    student = await StudentService.getStudentDetail(accessToken, Number(studentId));
  } catch (e) {
    return notFound();
  }

  if (!student) return notFound();

  return (
    <div>
      <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
        <Link
          href="/student"
          className="text-primary-700 hover:text-primary-600 hover:text-foreground hover:bg-muted/10 border-muted-background inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-all"
        >
          <ChevronLeftCircle className="mr-2 inline-block h-5 w-5" />
          Students
        </Link>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-8">
          <div className="flex flex-row items-center">
            <Avatar className="dark:border-border mr-3 h-12 w-12 border-2 border-solid border-white">
              <AvatarFallback className="text-xs text-gray-400">SU</AvatarFallback>
            </Avatar>

            <h1 className="text-4xl font-semibold">Student Edit</h1>
          </div>
          <div className="flex w-full flex-col gap-4 p-1">
            <StudentForm student={student.data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudentPage;
