import Link from 'next/link';
import { ChevronLeftCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TeacherForm } from '@/components/(authenticated)/admin/teachers/teacher-form';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | Thêm Mới Giáo Viên',
};

const CreateTeacherPage = () => {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
      <Link
        href="/admin/teacher"
        className="text-primary-700 hover:text-primary-600 hover:text-foreground hover:bg-muted/10 border-muted-background inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-all"
      >
        <ChevronLeftCircle className="mr-2 inline-block h-5 w-5" />
        Danh Sách Giáo Viên
      </Link>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-8">
        <div className="flex flex-row items-center">
          <Avatar className="dark:border-border mr-3 h-12 w-12 border-2 border-solid border-white">
            <AvatarFallback className="text-xs text-gray-400">SC</AvatarFallback>
          </Avatar>

          <h1 className="text-4xl font-semibold">Thêm Mới Giáo Viên</h1>
        </div>
        <div className="flex w-full flex-col gap-4 p-1">
          <TeacherForm />
        </div>
      </div>
    </div>
  );
};

export default CreateTeacherPage;
