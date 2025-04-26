import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import ForgotPasswordForm from '@/components/(unauthenticated)/forgot-password/ForgotPasswordForm';
import { getCsrfToken } from 'next-auth/react';

export default async function ForgotPasswordPage() {
  const csrfToken = (await getCsrfToken()) || '';

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Quên Mật Khẩu?</CardTitle>
              <CardDescription>
                Đừng lo lắng, nó sẽ xảy ra! Vui lòng liên hệ với quản trị viên để cấp mật khẩu mới.
              </CardDescription>
            </CardHeader>
            <hr className="mb-4" />
            <CardContent>
              <ForgotPasswordForm csrfToken={csrfToken} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
