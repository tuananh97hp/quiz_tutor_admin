import React from 'react';
import { cn } from '@/lib/utils';

interface MainProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  ref?: React.Ref<HTMLElement>;
}

export const Main = ({ fixed, ...props }: MainProps) => {
  return (
    <main
      className={cn(
        'peer-[.header-fixed]/header:mt-16',
        'mt-8 pb-8 md:mt-12 md:pb-12',
        fixed && 'fixed-main flex flex-grow flex-col overflow-hidden',
      )}
      {...props}
    />
  );
};

Main.displayName = 'Main';
