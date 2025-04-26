import React from 'react';
import { Header } from '@/components/(authenticated)/common/layout/header';
import { Search } from '@/components/(authenticated)/admin/search';
import { SearchProvider } from '@/context/search-context';
import { ThemeSwitch } from '@/components/(authenticated)/common/layout/theme-switch';
import { ProfileDropdown } from '@/components/(authenticated)/common/layout/profile-dropdown';
import { Main } from '@/components/(authenticated)/common/layout/main';
import { TopNav } from '@/components/(authenticated)/common/layout/top-nav';
import { Separator } from '@/components/ui/separator';
import { LogoHeader } from '@/components/(authenticated)/common/layout/logo-header';

type UnauthenticatedLayoutProps = {
  children: React.ReactNode;
};

const topNav = [
  {
    title: 'Tổng Quan',
    href: '/teacher',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Thời Khoá Biểu',
    href: '/teacher/calendar',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Thống Kê',
    href: '/teacher/reports',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Điểm Danh',
    href: '/teacher/attendance',
    isActive: false,
    disabled: true,
  },
];

export default async function AdminLayout({ children }: UnauthenticatedLayoutProps) {
  return (
    <>
      <SearchProvider>
        <Header>
          <LogoHeader />
          <Separator orientation="vertical" className="h-6" />
          <TopNav role="teacher" links={topNav} />
          <div className="ml-auto flex items-center space-x-4">
            <Search placeholder="Tìm kiếm ..." />
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <Main>{children}</Main>
      </SearchProvider>
    </>
  );
}
