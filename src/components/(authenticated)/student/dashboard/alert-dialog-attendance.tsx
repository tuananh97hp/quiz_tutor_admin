'use client';
import { cn } from '@/lib/utils';
import { UserRoundCheck } from 'lucide-react';
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { handler } from 'tailwindcss-animate';
import { IClass } from '@/types/models';
import { toast } from 'react-toastify';
import AttendanceService from '@/services/AttendanceService';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface IAlertDialogAttendanceProps {
  classItem?: IClass;
  dataCard: {
    isDisabled: boolean;
    textButton: string;
    color: string;
  };
}

const AlertDialogAttendance = ({ classItem, dataCard }: IAlertDialogAttendanceProps) => {
  const router = useRouter();
  const { data: currentSession } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const handlerAttendance = () => {
    startTransition(async () => {
      if (!classItem) return;
      if (!currentSession?.accessToken) return;
      try {
        await AttendanceService.studentMeAttendance(currentSession?.accessToken, classItem.id);
        toast(`Successfully Attendance`, { type: 'success' });
        router.refresh();
      } catch (e) {
        toast('Failed to attendance status', { type: 'error' });
      } finally {
        setIsOpen(false);
      }
    });
  };
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
        <button
          disabled={dataCard.isDisabled}
          onClick={() => setIsOpen(true)}
          className={cn(
            'group/btn relative flex-1 overflow-hidden rounded-xl bg-gradient-to-r to-teal-500 p-px font-medium text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors ',
            `from-${dataCard.color}-500`,
            {
              'hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset]': !dataCard.isDisabled,
            },
          )}
        >
          <div
            className={cn('relative rounded-xl bg-slate-950/50 px-4 py-3 transition-colors', {
              'group-hover/btn:bg-transparent': !dataCard.isDisabled,
            })}
          >
            <span className="relative flex items-center justify-center gap-2">
              {dataCard.textButton}
              <UserRoundCheck
                className={cn('h-4 w-4 transition-transform duration-300', {
                  'group-hover/btn:translate-x-1': !dataCard.isDisabled,
                })}
              />
            </span>
          </div>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn điểm danh lớp?</AlertDialogTitle>
          <AlertDialogDescription>
            Không thể hoàn tác hành động này. Sau khi điểm danh, chỉ giáo viên hoặc quản trị viên
            mới có thể thay đổi thông tin.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>Huỷ</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button loading={isPending} onClick={handlerAttendance}>
              Điểm Danh
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogAttendance;
