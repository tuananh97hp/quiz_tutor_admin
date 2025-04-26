import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import * as React from 'react';

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className={'h-[calc(100vh-20rem)] items-center flex'}>
      <Loader className={cn('m-auto animate-spin w-10 h-10 text-indigo-400')} />
    </div>
  );
}
