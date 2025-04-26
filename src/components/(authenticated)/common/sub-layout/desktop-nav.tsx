'use client';

import React from 'react';
import type { HTMLAttributes } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface DesktopNavProps extends HTMLAttributes<HTMLDivElement> {
  links: { title: string; href: string; icon: React.ElementType }[];
}

export const DesktopNav = ({ links, className, ...props }: DesktopNavProps) => {
  const pathname = usePathname();

  return (
    <div className={cn('flex flex-col gap-y-2', className)} {...props}>
      {links.map((link) => (
        <Link key={link.title} href={link.href}>
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start',
              pathname?.startsWith(link.href) && 'bg-secondary',
            )}
          >
            <link.icon className="mr-2 h-5 w-5" />
            <span>{link.title}</span>
          </Button>
        </Link>
      ))}
    </div>
  );
};
