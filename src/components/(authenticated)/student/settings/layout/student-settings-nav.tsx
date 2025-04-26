'use client';

import { DesktopNav } from '@/components/(authenticated)/common/sub-layout/desktop-nav';
import { MobileNav } from '@/components/(authenticated)/common/sub-layout/mobile-nav';
import React from 'react';
import { User, Lock } from 'lucide-react';

const StudentSettingsNav = () => {
  const links = [
    {
      title: 'Hồ Sơ',
      href: '/student/settings/profile',
      icon: User,
    },
    {
      title: 'Bảo Mật',
      href: '/student/settings/security',
      icon: Lock,
    },
  ];

  return (
    <>
      <DesktopNav links={links} className="hidden md:col-span-3 md:flex" />
      <MobileNav links={links} className="col-span-12 mb-8 md:hidden" />
    </>
  );
};

export default StudentSettingsNav;
