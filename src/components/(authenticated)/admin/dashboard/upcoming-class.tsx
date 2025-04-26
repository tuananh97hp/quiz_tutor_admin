'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Ellipsis, Check, CircleX, X, CircleCheck, ClipboardList } from 'lucide-react';
import { IClass } from '@/types/models';
import _ from 'lodash';
import { addMinutes, differenceInMilliseconds, getDay, isBefore, parse } from 'date-fns';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import AlertDialogAttendance from '@/components/(authenticated)/student/dashboard/alert-dialog-attendance';

interface IUpcomingClassesProps {
  classItem?: IClass;
}

const UpcomingClass = ({ classItem }: IUpcomingClassesProps) => {
  const now = new Date();
  const today = getDay(now);
  const currentSchedule = _(classItem?.schedules || [])
    .filter((cls) => +cls.day_of_week === today)
    .first();
  const isComingSoon = (() => {
    if (!currentSchedule) return false;

    const startTime = parse(currentSchedule.start_time, 'HH:mm', new Date());
    const nowMinus30 = addMinutes(now, 30);

    return isBefore(startTime, nowMinus30);
  })();
  const percentage = React.useMemo(() => {
    if (!currentSchedule) return 0;

    const startTime = parse(currentSchedule.start_time, 'HH:mm', new Date());
    const endTime = parse(currentSchedule.end_time, 'HH:mm', new Date());

    if (isBefore(now, endTime) && isBefore(startTime, now)) {
      const totalDuration = differenceInMilliseconds(endTime, startTime);
      const elapsedTime = differenceInMilliseconds(now, startTime);

      return Math.floor((elapsedTime / totalDuration) * 100);
    } else {
      return 0;
    }
  }, [currentSchedule]);

  const studentMeAttendance = classItem?.studentMeAttendance;
  const dataCard = React.useMemo(() => {
    if (!studentMeAttendance) {
      return {
        icon: Ellipsis,
        subIcon: Ellipsis,
        desc: 'Bạn chưa điểm danh lớp học này.',
        color: 'sky',
        isDisabled: !isComingSoon,
        textButton: 'Điểm Danh Ngay',
      };
    }
    if (!studentMeAttendance.is_attendance) {
      return {
        icon: CircleX,
        subIcon: X,
        desc: 'Bạn đã vắng mặt trong lớp học này.',
        color: 'red',
        isDisabled: true,
        textButton: 'Đã Vắng Mặt',
      };
    }
    return {
      icon: CircleCheck,
      subIcon: Check,
      desc: 'Bạn đã điểm danh lớp học này.',
      color: 'emerald',
      isDisabled: true,
      textButton: 'Đã Điểm Danh',
    };
  }, [studentMeAttendance]);
  const studentMeStudent = classItem?.studentMeStudent;
  const isMonitor = studentMeStudent?.is_lesson_monitor;

  return (
    <Card className="@container/card h-full bg-white">
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Lớp Học Sắp Tới</CardTitle>
          <CardDescription>Lớp học sắp tới hoặc đang diễn ra.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <div className="from-sky-500 from-emerald-500 from-red-500 text-sky-500 text-emerald-500 text-red-500 bg-sky-500/10 bg-emerald-500/10 bg-red-500/10 to-sky-500/0 to-emerald-500/0 to-red-500/0" />
        {classItem ? (
          <div className="group relative w-full">
            <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-2xl ">
              <div
                className={cn(
                  'absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br to-teal-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70',
                  `from-${dataCard.color}-500/20`,
                )}
              ></div>
              <div
                className={cn(
                  'absolute -right-16 -bottom-16 h-32 w-32 rounded-full bg-gradient-to-br from-teal-500/20 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70',
                  `to-${dataCard.color}-500/0`,
                )}
              ></div>
              <div className="relative p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div
                        className={cn(
                          'absolute -inset-1 rounded-xl bg-gradient-to-r to-teal-500 opacity-30 blur-sm transition-opacity duration-300 group-hover:opacity-40',
                          `from-${dataCard.color}-500`,
                        )}
                      ></div>
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900">
                        <dataCard.icon className={`text-${dataCard.color}-500`} />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">{classItem.name}</h3>
                      <p className="text-sm text-slate-400">{classItem.teacher?.name}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-slate-400">2 phút trước</span>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
                        `bg-${dataCard.color}-500/10`,
                        `text-${dataCard.color}-500`,
                      )}
                    >
                      <span
                        className={cn('h-1 w-1 rounded-full', `bg-${dataCard.color}-500`)}
                      ></span>
                      Hiện tại
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-xl bg-slate-900/50 p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                          `bg-${dataCard.color}-500/10`,
                        )}
                      >
                        <dataCard.subIcon className={`text-${dataCard.color}-500`} size="15" />
                      </div>
                      <p className="text-sm text-slate-400">{dataCard.desc}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-white">
                        Thời gian bắt đầu: {currentSchedule?.start_time}
                      </span>
                      <span className="text-slate-400">{percentage}%</span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-900">
                      <Progress value={percentage} />
                    </div>
                  </div>

                  <div className="flex gap-3 flex-col md:flex-row">
                    <AlertDialogAttendance classItem={classItem} dataCard={dataCard} />
                    {!!isMonitor && (
                      <button
                        disabled={!isComingSoon}
                        onClick={() => window.open(`/student/attendance/class/${classItem.id}`)}
                        className="flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 gap-2 font-medium text-white transition-colors hover:bg-slate-800"
                      >
                        Điểm Danh Lớp <ClipboardList className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between rounded-xl bg-slate-900/50 p-2">
                  <div className="flex items-center gap-1">
                    <div>
                      <p className="text-xs text-slate-400">
                        Bạn sẽ được kiểm tra 30 phút trước khi lớp học bắt đầu.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="text-muted-foreground/60 flex h-60 flex-col items-center justify-center gap-y-4"
            data-testid="empty-document-state"
          >
            <CircleCheck className="h-12 w-12" strokeWidth={1.5} />
            <div className="text-center">
              <h3 className="text-lg font-semibold">Không có lớp học sắp tới</h3>

              <p className="mt-2 max-w-[60ch]">
                Hiện tại không có lớp học nào sắp tới được lên lịch.
              </p>
              <p className="max-w-[60ch]">
                Vui lòng kiểm tra lại sau hoặc tham khảo email của bạn để biết thông tin cập nhật.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingClass;
