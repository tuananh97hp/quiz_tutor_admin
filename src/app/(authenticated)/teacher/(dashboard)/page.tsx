import React from 'react';
import { getCurrentAccessToken } from '@/utils/session';
import { BarChartMultiple } from '@/components/(authenticated)/admin/dashboard/bar-chart-multiple';
import { PieChartDonut } from '@/components/(authenticated)/admin/dashboard/pie-chart-donut';
import { AreaChartInteractive } from '@/components/(authenticated)/admin/dashboard/area-chart-interactive';
import ClassService from '@/services/ClassService';
import { getDay, isAfter, parse } from 'date-fns';
import _ from 'lodash';
import TeacherUpcomingClass from '@/components/(authenticated)/teacher/dashboard/teacher-upcoming-class';
import TeacherClassesToday from '@/components/(authenticated)/teacher/dashboard/teacher-classes-today';
import StudentAttendanceDay from '@/components/(authenticated)/teacher/dashboard/student-attendance-day';
import StudentAttendanceMonth from '@/components/(authenticated)/teacher/dashboard/student-attendance-month';
import ClassesMonth from '@/components/(authenticated)/teacher/dashboard/classes-month';
import LessonsMonth from '@/components/(authenticated)/teacher/dashboard/lessons-month';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giáo Viên | Tổng Quan',
};

const HomePage = async () => {
  const accessToken = await getCurrentAccessToken();
  let classesToday;
  if (accessToken) {
    classesToday = await ClassService.teacherMeGetClassesToday(accessToken);
  }
  let upcomingClass;
  if (classesToday?.data.length) {
    const now = new Date();
    const today = getDay(now);

    const upcomingSchedules = _(classesToday.data)
      .flatMap((cls) =>
        cls.schedules.map((schedule) => ({
          ...cls,
          ...schedule,
        })),
      )
      .filter((sch) => +sch.day_of_week === today)
      .map((sch) => {
        const startTime = parse(sch.start_time, 'H:mm', now);
        const endTime = parse(sch.end_time, 'H:mm', now);
        return {
          ...sch,
          startTime,
          endTime,
        };
      })
      .filter((sch) => isAfter(sch.startTime, now) || isAfter(sch.endTime, now))
      .sortBy('startTime')
      .value();

    upcomingClass = _.first(upcomingSchedules);
  }
  return (
    <div className="mx-auto -mt-4 w-full max-w-screen-2xl px-4 md:px-8">
      <h2 className="text-2xl font-bold tracking-tight">Xin chào, chào mừng bạn trở lại 👋</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="w-full mt-10">
          <TeacherUpcomingClass classItem={upcomingClass} />
        </div>
        <div className="w-full mt-10">
          <TeacherClassesToday classes={classesToday?.data || []} />
        </div>
      </div>
      <div className="w-full mt-10 grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StudentAttendanceDay />
        <StudentAttendanceMonth />
        <ClassesMonth />
        <LessonsMonth />
      </div>
      <div className="w-full mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
        <div className="col-span-2">
          <BarChartMultiple />
        </div>
        <div>
          <PieChartDonut />
        </div>
      </div>
      <div className="w-full mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
        <div className="col-span-2 md:col-span-4">
          <AreaChartInteractive />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
