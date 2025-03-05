'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Services
import { ROUTES } from '@/router/routes';
import { signOut } from 'next-auth/react';
import { deleteCookie } from '@/utils/cookies';
import { STORAGE_KEYS } from '@/utils/constants';

type LayoutPropsType = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutPropsType) => {
  const handleSignOut = () => {
    signOut().then(() => {
      deleteCookie(STORAGE_KEYS.CSRF_TOKEN);
    });
  };

  return (
    <div className={'flex flex-col h-screen'}>
      {/*===Header===*/}
      <nav className="navbar navbar-expand navbar-dark bg-white px-5 py-3">
        <Link href={ROUTES.HOME_PAGE} className="me-3 hover:underline">
          Home
        </Link>
        <span onClick={() => handleSignOut()} className="cursor-pointer hover:underline">
          Logout
        </span>
      </nav>

      {/*===Main content===*/}
      <div className="container-fluid flex flex-1 bg-gray-300">{children}</div>

      {/*===Footer===*/}
      <footer className="text-center bg-white">
        <div className="text-center text-dark p-3">© 2023 Copyright</div>
      </footer>
    </div>
  );
};

export default Layout;
