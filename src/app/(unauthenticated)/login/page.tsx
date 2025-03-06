import React from 'react';

// lib
import { getCsrfToken } from 'next-auth/react';

// components
import LoginForm from '@/components/Login/LoginForm';

// UI components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function LoginPage() {
  const csrfToken = (await getCsrfToken()) || '';

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sign in to your account</CardTitle>
              <CardDescription>Welcome back, we are lucky to have you.</CardDescription>
            </CardHeader>
            <hr className="mb-4" />
            <CardContent>
              <LoginForm csrfToken={csrfToken} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
