'use client';

import { DesktopNav } from '@/components/(authenticated)/common/sub-layout/desktop-nav';
import { MobileNav } from '@/components/(authenticated)/common/sub-layout/mobile-nav';
import React from 'react';
import { CalendarCheck, HandCoins, BookA } from 'lucide-react';

const StudentReportsNav = () => {
  const links = [
    {
      title: 'Điểm Danh',
      href: '/student/reports/attendance',
      icon: CalendarCheck,
    },
    {
      title: 'Đóng Tiền',
      href: '/student/reports/payment',
      icon: HandCoins,
    },
    {
      title: 'Danh Sách Lớp',
      href: '/student/reports/class',
      icon: BookA,
    },
  ];

  return (
    <>
      <DesktopNav links={links} className="hidden md:col-span-3 lg:col-span-2 md:flex" />
      <MobileNav links={links} className="col-span-12 mb-8 md:hidden" />
    </>
  );
};

export default StudentReportsNav;
