'use client';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { ROUTES } from '@/router/routes';
import { ICONS } from '@/assets';

// Service
import { LoginRequest } from '@/types/AuthType';

// Auth
import { signIn } from 'next-auth/react';
import { setCookie } from '@/utils/cookies';
import { STORAGE_KEYS } from '@/utils/constants';
import AuthService from '@/services/AuthService';

type LoginFormProps = {
  csrfToken: string;
};

const LoginForm = ({ csrfToken }: LoginFormProps) => {
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
    <form
      onSubmit={handleLogin}
      className="bg-white shadow w-full rounded-lg divide-y divide-gray-200"
    >
      <div className="px-5 py-7">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
        <input
          type="text"
          name={'username'}
          className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        />
        <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
        <input
          type="password"
          name={'password'}
          className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        />
        <button
          type="submit"
          className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
        >
          <span className="inline-block mr-2">Login</span>
        </button>
      </div>
      <div className="py-5">
        <div className="grid grid-cols-2 gap-1">
          <Link
            href={ROUTES.FORGOT_PASSWORD}
            className="text-center sm:text-left whitespace-nowrap"
          >
            <button className="flex items-center transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
              <Image src={ICONS.LOCK_OPEN_ICON} width="17" height="17" alt="" />
              <span className="inline-block ml-1">Forgot Password</span>
            </button>
          </Link>
          <div className="text-center sm:text-right  whitespace-nowrap">
            <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
              <span className="inline-block ml-1">Sign up</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
