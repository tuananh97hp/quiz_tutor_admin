import { getCurrentAccessToken } from '@/utils/session';
import React from 'react';
import StudentUpcomingClass from '@/components/(authenticated)/student/dashboard/student-upcoming-class';
import StudentClassesToday from '@/components/(authenticated)/student/dashboard/student-classes-today';
import UnpaidLessons from '@/components/(authenticated)/student/dashboard/unpaid-lessons';
import AbsentLessons from '@/components/(authenticated)/student/dashboard/absent-lessons';
import ScoreChart from '@/components/(authenticated)/student/dashboard/score-chart';
import ClassService from '@/services/ClassService';
import _ from 'lodash';
import { getDay, parse, isAfter } from 'date-fns';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Học Sinh | Tổng Quan',
};

const HomePage = async () => {
  const accessToken = await getCurrentAccessToken();

  let classesToday;
  if (accessToken) {
    classesToday = await ClassService.studentMeGetClassesToday(accessToken);
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
          <StudentUpcomingClass classItem={upcomingClass} />
        </div>
        <div className="w-full mt-10">
          <StudentClassesToday classes={classesToday?.data || []} />
        </div>
      </div>
      <div className="w-full mt-10 grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="col-span-1 lg:col-span-1 w-full grid grid-cols-2 gap-4 lg:grid-cols-1">
          <UnpaidLessons />
          <AbsentLessons />
        </div>
        <div className="col-span-1 lg:col-span-3">
          <ScoreChart />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
