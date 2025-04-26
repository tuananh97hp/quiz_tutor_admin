'use client';

import React, { useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BookUp2 } from 'lucide-react';

import AttendanceService from '@/services/AttendanceService';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { IClass, IStudent, IStudentAttendance } from '@/types/models';
import { AttendanceStudentDataTable } from '@/components/(authenticated)/admin/attendance/attendance-student-table';
import ClassService from '@/services/ClassService';
import { format } from 'date-fns';
import _ from 'lodash';
import { InputDatePicker } from '@/components/ui/input-date-picker';
import { Separator } from '@/components/ui/separator';

interface IAttendanceFormProps {
  classItem: IClass;
}

export const AttendanceForm = ({ classItem }: IAttendanceFormProps) => {
  const { data: currentSession } = useSession();
  const [isPending, startTransitionPending] = React.useTransition();
  const [dateAttendance, setDateAttendance] = React.useState<string>(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const [studentListExtend, setStudentListExtend] = React.useState<IStudentAttendance[]>([]);
  const [isSubmitting, startTransitionSubmit] = React.useTransition();
  const router = useRouter();

  useEffect(() => {
    startTransitionPending(async () => {
      if (currentSession?.accessToken && classItem.id) {
        const results = await AttendanceService.getStudentAttendance(
          currentSession?.accessToken,
          classItem.id,
          {
            date: dateAttendance,
          },
        );
        if (results.data) {
          setStudentListExtend(results.data);
        }
      }
    });
  }, [classItem.id, currentSession?.accessToken, dateAttendance]);
  function onSubmit() {
    startTransitionSubmit(async () => {
      if (!currentSession?.accessToken) return;
      try {
        const studentPayload = studentListExtend.map(({ id, is_attendance }) => ({
          id,
          is_attendance,
        }));
        await AttendanceService.updateStudentAttendance(currentSession?.accessToken, classItem.id, {
          date: dateAttendance,
          students: studentPayload,
        });
        toast(`Successfully Attendance`, { type: 'success' });
        router.push('/admin/attendance');
      } catch (e) {
        toast(`Failed To Attendance`, { type: 'error' });
      }
    });
  }

  const onChangeStdSelected = (id: number) => {
    const newStudentListExtend = studentListExtend.map((s) => {
      if (id === 0) {
        return { ...s, is_attendance: 0 };
      } else if (id === -1) {
        return { ...s, is_attendance: 1 };
      }
      if (s.id === id) {
        return { ...s, is_attendance: Math.abs(s.is_attendance - 1) };
      }
      return s;
    });
    setStudentListExtend(newStudentListExtend);
  };

  const countAbsent = useMemo(() => {
    return _.countBy(studentListExtend, 'is_attendance');
  }, [studentListExtend]);

  return (
    <>
      <div className="grid w-full grid-cols-12 gap-8">
        <div className="relative col-span-12 lg:col-span-8 xl:col-span-7">
          <Card className="relative border-2 rounded-xl before:rounded-xl bg-background">
            <CardHeader>
              <CardTitle className="text-2xl">Thông tin điểm danh</CardTitle>
              <CardDescription>
                Đánh dấu vào ô nếu học sinh đã tham dự lớp học. Nếu không, điều đó có nghĩa là học
                sinh đã vắng mặt.
              </CardDescription>
            </CardHeader>
            <hr className="border-border" />
            <CardContent className="p-2 pb-5">
              <div className="w-1/2 mb-4">
                <div className="text-sm font-medium text-muted-foreground mb-1">Ngày học</div>
                <InputDatePicker
                  value={dateAttendance}
                  onChangeDate={setDateAttendance}
                  placeholder="Start date"
                />
              </div>
              <div className="mb-4">
                <div className="text-sm font-medium text-muted-foreground mb-1">Học sinh</div>
                <AttendanceStudentDataTable
                  studentList={studentListExtend}
                  isPending={isPending}
                  onChangeStdSelected={onChangeStdSelected}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-4 xl:col-span-5">
          <div className="dark:bg-background border-border bg-neutral-100 sticky top-20 flex flex-col overflow-auto rounded-xl border px-4 py-6">
            <div className="-mx-2 flex flex-1 flex-col px-2">
              <h3 className="text-foreground text-2xl font-semibold">
                Điểm danh lớp: {classItem.name}
              </h3>

              <p className="text-muted-foreground mt-2 text-sm">
                Lựa chọn các học sinh đi học và văng mặt. Kiểm tra lại dữ liệu một cách chính xác
                sau đó click điểm danh.
              </p>

              <hr className="border-border mb-8 mt-4" />
              <div className="flex gap-5">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Số học sinh văng
                  </div>
                  <div className="text-2xl font-semibold text-red-500">{countAbsent[0] || 0}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Số học sinh tham dự
                  </div>
                  <div className="text-2xl font-semibold">{countAbsent[1] || 0}</div>
                </div>
              </div>
              <hr className="border-border mb-8 mt-4" />
              <div
                className={cn('custom-scrollbar -mx-2 flex flex-1 flex-col overflow-hidden px-2')}
              >
                <div className="flex flex-1 flex-col">
                  <Button loading={isSubmitting} onClick={onSubmit}>
                    <BookUp2 />
                    Điểm danh
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
