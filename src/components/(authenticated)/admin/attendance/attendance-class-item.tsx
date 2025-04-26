'use client';

import React from 'react';
import { IClass } from '@/types/models';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  CalendarCheck,
  CalendarX,
  Clock,
  Edit,
  MoreHorizontal,
  PencilRuler,
  Users,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { currentScheduleOfDate, getStatusSchedule, percentageSchedule } from '@/utils/models';

interface IClassTableProps {
  classItem: IClass;
}

export const AttendanceClassItem = ({ classItem }: IClassTableProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const currentSchedule = currentScheduleOfDate(classItem);
  const percentage = percentageSchedule(currentSchedule);
  const statusSchedule = getStatusSchedule(currentSchedule);

  return (
    <div className="h-full">
      <Card className="border border-gray-200 bg-white rounded-xl relative flex flex-col h-full">
        <Badge className={`absolute top-4 right-4 text-sm font-medium px-4 py-1 rounded-full`}>
          {classItem.isConfirmed ? 'Giáo Viên Đã Xác Nhận' : 'Đang Điểm Danh'}
        </Badge>

        <CardContent className="p-6 flex-1">
          <h2 className="text-lg font-semibold mb-2 line-clamp-2">{classItem.name}</h2>

          <div className="flex flex-wrap gap-2 min-h-6 pt-2 pb-4">
            <span className="text-muted-foreground">Giáo viên:</span> ({classItem.teacher?.id}){' '}
            {classItem.teacher?.name}
          </div>

          <div className="space-y-3 text-sm pt-2">
            <div className="flex flex-wrap gap-4 py-2 px-1 rounded-md text-sm dark:text-gray-200 text-gray-700">
              <div className="flex items-center group">
                <Briefcase className="w-4 h-4 mr-1.5 text-blue-600 dark:text-blue-400" />
                <span className="font-medium">
                  Số lượng học sinh: {classItem.studentCount || 0}
                </span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-3 bg-muted/40 flex items-center">
              <div className="flex flex-col w-1/2 gap-y-2 items-center">
                <span className="text-2xl font-bold">{classItem.studentPresenceCount || 0}</span>
                <span className="text-sm text-muted-foreground flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Tham dự
                </span>
              </div>

              <Separator orientation="vertical" className="mx-4 h-12" />

              <div className="flex flex-col items-center w-1/2 gap-y-2">
                <span className="text-2xl font-bold text-red-500">
                  {(classItem.studentCount || 0) - (classItem.studentPresenceCount || 0)}
                </span>
                <span className="text-sm text-muted-foreground flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Vắng mặt
                </span>
              </div>
            </div>

            <p className="flex items-center gap-2 text-muted-foreground font-medium pt-2">
              <Calendar size={14} className="text-green-600" />
              Thời gian bắt đầu: <span className="">{currentSchedule?.start_time || '00:00'}</span>
              <CalendarX size={14} className="text-red-600 ml-4" />
              Thời gian kết thúc: <span className="">{currentSchedule?.end_time || '00:00'}</span>
            </p>
          </div>
        </CardContent>

        <div className="mt-auto">
          <div className="px-6 pb-3">
            <Progress value={percentage} className="h-2.5 rounded-full" />
            <div className="flex justify-between mt-2">
              <p className="text-xs text-muted-foreground">Tiến trình</p>
              <p className="text-xs font-medium">Kết thúc</p>
            </div>
          </div>
          <div className="p-4 border-t flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">{statusSchedule.label}</p>
            </div>
            <div
              className="flex relative justify-end"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="transition-all duration-300" asChild>
                  <Link
                    href={`/admin/attendance/class/${classItem.id}`}
                    className="flex items-center gap-2"
                  >
                    Xem thông tin
                    <motion.div
                      animate={{ x: isHovered ? 5 : 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <ArrowRight size={16} />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
