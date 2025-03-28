import React from 'react';
import { Header } from '@/components/(admin)/layout/header';
import { Search } from '@/components/(admin)/search';
import { SearchProvider } from '@/context/search-context';
import { ThemeSwitch } from '@/components/(admin)/layout/theme-switch';
import { ProfileDropdown } from '@/components/(admin)/layout/profile-dropdown';
import { Main } from '@/components/(admin)/layout/main';
import { TopNav } from '@/components/(admin)/layout/top-nav';
import { TeamSwitcher } from '@/components/(admin)/layout/team-switcher';
import { Separator } from '@/components/ui/separator';

type UnauthenticatedLayoutProps = {
  children: React.ReactNode;
};

const topNav = [
  {
    title: 'Overview',
    href: '/',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Students',
    href: '/student',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Classes',
    href: '/class',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Payments',
    href: '/payment',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Attendance',
    href: '/attendance',
    isActive: false,
    disabled: true,
  },
];

export default async function AdminLayout({ children }: UnauthenticatedLayoutProps) {
  return (
    <>
      <SearchProvider>
        <Header>
          <TeamSwitcher />
          <Separator orientation="vertical" className="h-6" />
          <TopNav links={topNav} />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <Main>{children}</Main>
      </SearchProvider>
    </>
  );
}
