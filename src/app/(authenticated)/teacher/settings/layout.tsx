import React from 'react';
import TeacherSettingsNav from '@/components/(authenticated)/teacher/settings/layout/teacher-settings-nav';

export type AdminSettingsLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminSettingsLayout({ children }: AdminSettingsLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
      <h1 className="text-4xl font-semibold">Cài Đặt</h1>

      <div className="mt-4 grid grid-cols-12 gap-x-8 md:mt-8">
        <TeacherSettingsNav />
        <div className="col-span-12 md:col-span-9">{children}</div>
      </div>
    </div>
  );
}
