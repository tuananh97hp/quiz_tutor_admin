import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ITabButtonProps {
  label: string;
  icon: LucideIcon;
  count: number;
  color?: string;
}

const TabButton = ({ icon: Icon, label, count, color = '' }: ITabButtonProps) => {
  return (
    <>
      <span className="flex justify-center items-center">
        <Icon className={cn('mr-2 inline-block h-4 w-4', color)} />
        {label}
      </span>
      <span className="ml-1 inline-block opacity-50">{count}</span>
    </>
  );
};

export default TabButton;
