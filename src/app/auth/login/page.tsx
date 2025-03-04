// components
import LoginForm from '@/components/Login/LoginForm';
import { getCsrfToken } from 'next-auth/react';

export default async function LoginPage() {
  const csrfToken = (await getCsrfToken()) || '';

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">Login page</h1>
        <LoginForm csrfToken={csrfToken} />
      </div>
    </div>
  );
}
