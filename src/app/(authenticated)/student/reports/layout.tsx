import React from 'react';
import StudentReportsNav from '@/components/(authenticated)/student/reports/layout/student-reports-nav';

export type AdminSettingsLayoutProps = {
  children: React.ReactNode;
};

export default async function StudentReportsLayout({ children }: AdminSettingsLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
      <h1 className="text-4xl font-semibold">Thông tin thống kê</h1>

      <div className="mt-4 grid grid-cols-12 gap-x-8 md:mt-8">
        <StudentReportsNav />

        <div className="col-span-12 md:col-span-9 lg:col-span-10">{children}</div>
      </div>
    </div>
  );
}
