'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Ellipsis, Check, CircleX, X, CircleCheck, ArrowRight } from 'lucide-react';
import { IClass } from '@/types/models';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { checkUpcomingOrStarted, currentScheduleOfDate, percentageSchedule } from '@/utils/models';

interface IUpcomingClassesProps {
  classItem?: IClass;
}

const TeacherUpcomingClass = ({ classItem }: IUpcomingClassesProps) => {
  const currentSchedule = currentScheduleOfDate(classItem);
  const isComingSoon = checkUpcomingOrStarted(currentSchedule);
  const percentage = percentageSchedule(currentSchedule);

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
        desc: 'You were absent from this class.',
        color: 'red',
        isDisabled: true,
        textButton: 'No Attendance',
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
                    <span className="text-xs text-slate-400">2 min ago</span>
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
                      Now
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
                        Start Time: {currentSchedule?.start_time}
                      </span>
                      <span className="text-slate-400">{percentage}%</span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-900">
                      <Progress value={percentage} />
                    </div>
                  </div>

                  <div className="flex gap-3 flex-col md:flex-row">
                    <button
                      disabled={dataCard.isDisabled}
                      onClick={() => window.open(`/teacher/attendance/class/${classItem.id}`)}
                      className={cn(
                        'group/btn relative flex-1 overflow-hidden rounded-xl bg-gradient-to-r to-teal-500 p-px font-medium text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors ',
                        `from-${dataCard.color}-500`,
                        {
                          'hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset]':
                            !dataCard.isDisabled,
                        },
                      )}
                    >
                      <div
                        className={cn(
                          'relative rounded-xl bg-slate-950/50 px-4 py-3 transition-colors',
                          {
                            'group-hover/btn:bg-transparent': !dataCard.isDisabled,
                          },
                        )}
                      >
                        <span className="relative flex items-center justify-center gap-2">
                          {dataCard.textButton}
                          <ArrowRight
                            className={cn('h-4 w-4 transition-transform duration-300', {
                              'group-hover/btn:translate-x-1': !dataCard.isDisabled,
                            })}
                          />
                        </span>
                      </div>
                    </button>
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
                Hiện tại bạn không có lớp học nào sắp tới được lên lịch.
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

export default TeacherUpcomingClass;
