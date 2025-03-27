import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className={'h-screen items-center flex'}>
      <Loader className={cn('m-auto animate-spin w-10 h-10 text-indigo-400')} />
    </div>
  );
}
