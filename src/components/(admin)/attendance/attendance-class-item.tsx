'use client';

import React from 'react';
import { IClass } from '@/types/models';
import { CalendarCheck, Edit, Loader, MoreHorizontal, PencilRuler, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DAY_OF_WEEK } from '@/utils/constants/date';
import { Badge } from '@/components/ui/badge';
import { formatMoney } from '@/utils/handle';
import Link from 'next/link';

interface IClassTableProps {
  classItem: IClass;
}
interface IClassDataTableAction {
  classItem: IClass;
}

const AttendanceClassAction = ({ classItem }: IClassDataTableAction) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger data-testid="document-table-action-btn">
        <MoreHorizontal className="text-muted-foreground h-5 w-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52" align="start" forceMount>
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <PencilRuler className="mr-2 h-4 w-4" /> Change Status
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Users className="mr-2 h-4 w-4" /> Students
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CalendarCheck className="mr-2 h-4 w-4" />
          Attendance
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export const AttendanceClassItem = ({ classItem }: IClassTableProps) => {
  const [isPending, startTransition] = React.useTransition();

  return (
    <div className="h-full">
      <Card className="bg-white h-full">
        <CardHeader>
          <CardTitle className="text-2xl">{classItem.name}</CardTitle>
          <CardDescription>Start Date: {classItem.start_date}</CardDescription>
        </CardHeader>
        <hr className="mb-4" />
        <CardContent className="h-[calc(100%-203px)]">
          <div className="flex flex-col gap-x-3 gap-y-1">
            <div className="text-foreground/50 font-medium">Schedule: &nbsp;</div>
            <div className="flex flex-col">
              {classItem.schedules.map((schedule, index) => (
                <div key={index} className="flex gap-x-3">
                  <div className="flex items-center gap-y-1">
                    <span className="text-foreground/50 text-xs font-medium">Start: &nbsp;</span>
                    <div className="text-foreground/50 text-sm font-medium">
                      {schedule.start_time}
                    </div>
                  </div>
                  <div className="flex items-center gap-y-1">
                    <span className="text-foreground/50 text-xs font-medium">End: &nbsp;</span>
                    <div className="text-foreground/50 text-sm font-medium">
                      {schedule.end_time}
                    </div>
                  </div>
                  <div className="flex items-center gap-y-1">
                    <span className="text-foreground/50 text-xs font-medium">
                      Day of week: &nbsp;
                    </span>
                    <div className="text-foreground/50 text-sm font-medium">
                      {DAY_OF_WEEK[schedule.day_of_week]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-foreground/50 font-medium mt-2">Fee: &nbsp;</div>
            <div className="flex flex-col mt-1">
              <Badge variant="warning">
                <span className="truncate md:max-w-[10rem]">{formatMoney(classItem.fee)}đ</span>
              </Badge>
            </div>
          </div>
        </CardContent>
        <hr className="mb-4" />
        <CardFooter>
          <div className="flex items-center justify-between w-full">
            <AttendanceClassAction classItem={classItem} />
            <div>
              <Button className="bg-green-500 text-white hover:bg-green-500/90" asChild>
                <Link href={`/attendance/class/${classItem.id}`}>
                  <CalendarCheck className="mr-2 h-4 w-4" /> Attendance
                </Link>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
