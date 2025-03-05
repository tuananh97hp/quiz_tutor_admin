import { getCsrfToken, signIn } from 'next-auth/react';
import { LoginRequest } from '@/types/AuthType';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/router/routes';

// components
import LoginForm from '@/components/Login/LoginForm';

// Utils
import { STORAGE_KEYS } from '@/utils/constants';
import { setCookie } from '@/utils/cookies';

export default async function LoginPage() {
  const csrfToken = (await getCsrfToken()) || '';
  const handleLogin = (event: any) => {
    event.preventDefault();

    const req: LoginRequest = {
      password: '',
      username: '',
    };
    signIn('credentials', {
      redirect: true,
      callbackUrl: '/',
    })
      .then(() => {
        setCookie(STORAGE_KEYS.CSRF_TOKEN, csrfToken);
        redirect(ROUTES.HOME_PAGE);
      })
      .finally(() => {});
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
