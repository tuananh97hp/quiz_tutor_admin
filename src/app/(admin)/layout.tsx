import React from 'react';
import RadialBackground from '@/components/shared/Background/RadialBackground';
import { Header } from '@/components/(admin)/layout/header';
import { Search } from '@/components/(admin)/search';

type UnauthenticatedLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: UnauthenticatedLayoutProps) {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          {/*<ThemeSwitch />*/}
          {/*<ProfileDropdown />*/}
        </div>
      </Header>
    </>
  );
}
