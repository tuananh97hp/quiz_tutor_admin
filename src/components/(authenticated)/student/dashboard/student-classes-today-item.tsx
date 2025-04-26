import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Clock, Clock1 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { IClass } from '@/types/models';
import _ from 'lodash';
import { getDay } from 'date-fns';

interface IStudentClassesTodayItemProps {
  classItem: IClass;
}

const StudentClassesTodayItem = ({ classItem }: IStudentClassesTodayItemProps) => {
  const now = new Date();
  const today = getDay(now);
  const currentSchedule = _(classItem?.schedules || [])
    .filter((cls) => +cls.day_of_week === today)
    .first();

  return (
    <Card className="hover:animate-gradient grid grid-cols-1 gap-2 rounded-xl border border-l-4 border-l-emerald-500 bg-none p-2 transition-all duration-300 before:rounded-xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-transparent dark:hover:from-blue-950 mb-4">
      <CardContent className="m-0 flex h-full items-center justify-between p-0 md:h-24">
        {/* Left Section */}
        <div className="p-4 pl-5">
          <CardTitle className="text-xl">{classItem.name}</CardTitle>
          <div className="mt-2 flex flex-col gap-2 md:flex-row">
            <Badge variant="secondary">{classItem.teacher?.name || '-'}</Badge>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex h-full w-1/2 items-center justify-start">
          <div className="h-full w-full flex-col items-start justify-center border-l-2 border-slate-200 px-5 py-5 flex dark:border-l-neutral-700">
            <div className="flex w-full items-center justify-between space-x-2">
              <div className="flex gap-2">
                <Clock1 className="text-muted-foreground h-5 w-5" />
                <p className="text-sm">Bắt đầu</p>
              </div>
              <p className="text-lg font-semibold">{currentSchedule?.start_time}</p>
            </div>
            <div className="mt-4 flex w-full items-center justify-between space-x-2">
              <div className="flex gap-2">
                <Clock className="text-muted-foreground h-5 w-5" />
                <p className="text-sm">Kết thúc</p>
              </div>
              <p className="text-lg font-semibold">{currentSchedule?.end_time}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentClassesTodayItem;
