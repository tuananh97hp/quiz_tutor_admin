'use client';

import React from 'react';
import { DesktopNav } from '@/components/(authenticated)/common/sub-layout/desktop-nav';
import { MobileNav } from '@/components/(authenticated)/common/sub-layout/mobile-nav';
import { CalendarCheck, HandCoins, BookA } from 'lucide-react';

const TeacherReportsNav = () => {
  const links = [
    {
      title: 'Danh Sách Lớp',
      href: '/teacher/reports/class',
      icon: BookA,
    },
    {
      title: 'Điểm Danh',
      href: '/teacher/reports/attendance',
      icon: CalendarCheck,
    },
    {
      title: 'Thanh Toán',
      href: '/teacher/reports/payment',
      icon: HandCoins,
    },
  ];

  return (
    <>
      <DesktopNav links={links} className="hidden md:col-span-3 lg:col-span-2 md:flex" />
      <MobileNav links={links} className="col-span-12 mb-8 md:hidden" />
    </>
  );
};

export default TeacherReportsNav;
