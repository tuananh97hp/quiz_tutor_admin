'use client';
import { cn } from '@/lib/utils';
import { ListCheck, UserRoundCheck } from 'lucide-react';
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

interface IAlertDialogConfirmedProps {
  classItem?: IClass;
  isDisabled: boolean;
}

const AlertDialogConfirmed = ({ classItem, isDisabled }: IAlertDialogConfirmedProps) => {
  const router = useRouter();
  const { data: currentSession } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const handlerConfirmAttendance = () => {
    startTransition(async () => {
      if (!classItem) return;
      if (!currentSession?.accessToken) return;
      try {
        await AttendanceService.teacherMeConfirmStudentAttendance(
          currentSession?.accessToken,
          classItem.id,
        );
        toast(`Successfully Confirm Attendance`, { type: 'success' });
        router.refresh();
      } catch (e) {
        toast('Failed to confirm attendance status', { type: 'error' });
      } finally {
        setIsOpen(false);
      }
    });
  };
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="w-full"
          variant="destructive"
          disabled={isDisabled}
          onClick={() => setIsOpen(true)}
        >
          <ListCheck />
          Xác Nhận
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn Chưa?</AlertDialogTitle>
          <AlertDialogDescription>
            Khi khi xác nhận học sinh sẽ không thể điểm danh trong buổi học này. Chỉ có giáo viên
            hoặc quản trị viên có thể thay đổi. Hay đảm bảo sĩ số lớp là đúng.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>Huỷ</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button loading={isPending} onClick={handlerConfirmAttendance}>
              Xác Nhận
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogConfirmed;
