import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import ForceChangePasswordForm from '@/components/(authenticated)/force-change-password/ForceChangePasswordForm';
export default async function ForceChangePasswordPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser?.force_change_password) {
    redirect('/');
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Bắt buộc thay đổi mật khẩu</CardTitle>
              <CardDescription>
                Đừng lo lắng. Vì lý do bảo mật, bạn cần thay đổi mật khẩu trước khi tiếp tục sử dụng
                hệ thống.
              </CardDescription>
            </CardHeader>
            <hr className="mb-4" />
            <CardContent>
              <ForceChangePasswordForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
import { getCurrentUser } from '@/utils/session';

import { redirect } from 'next/navigation';
