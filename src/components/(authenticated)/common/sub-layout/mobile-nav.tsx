'use client';

import type { HTMLAttributes } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Lock, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

export interface MobileNavProps extends HTMLAttributes<HTMLDivElement> {
  links: { title: string; href: string; icon: React.ElementType }[];
}

export const MobileNav = ({ links, className, ...props }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <div
      className={cn('flex flex-wrap items-center justify-start gap-x-2 gap-y-4', className)}
      {...props}
    >
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
