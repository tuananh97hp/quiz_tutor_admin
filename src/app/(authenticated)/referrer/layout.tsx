import React from 'react';
import { Header } from '@/components/(authenticated)/common/layout/header';
import { Search } from '@/components/(authenticated)/admin/search';
import { SearchProvider } from '@/context/search-context';
import { ThemeSwitch } from '@/components/(authenticated)/common/layout/theme-switch';
import { ProfileDropdown } from '@/components/(authenticated)/common/layout/profile-dropdown';
import { Main } from '@/components/(authenticated)/common/layout/main';
import { TopNav } from '@/components/(authenticated)/common/layout/top-nav';
import { TeamSwitcher } from '@/components/(authenticated)/common/layout/team-switcher';
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
];

export default async function AdminLayout({ children }: UnauthenticatedLayoutProps) {
  return (
    <>
      <SearchProvider>
        <Header>
          {/*TODO: modify to logo*/}
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
