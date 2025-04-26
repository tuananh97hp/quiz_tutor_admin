'use client';

import React from 'react';

import { GalleryVerticalEnd } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LogoHeader({}: {}) {
  return (
    <Button variant="ghost" className="p-0">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <GalleryVerticalEnd className="size-4" />
      </div>
      <div className=" flex-1 text-left text-sm leading-tight hidden lg:grid">
        <span className="truncate font-semibold">Auto Smart</span>
        <span className="truncate text-xs">Quản lý thông minh</span>
      </div>
    </Button>
  );
}
