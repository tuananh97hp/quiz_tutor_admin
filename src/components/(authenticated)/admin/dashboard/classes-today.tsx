import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CircleHelp } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ClassesTodayItem from '@/components/(authenticated)/admin/dashboard/classes-today-item';
import { IClass } from '@/types/models';

interface IClassesTodayProps {
  classes: IClass[];
}

const ClassesToday = ({ classes }: IClassesTodayProps) => {
  return (
    <Card className="@container/card h-full bg-white">
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Các lớp học hôm nay</CardTitle>
          <CardDescription>
            Danh sách các lớp học đã hoặc chưa diễn ra trong ngày hôm nay.
          </CardDescription>
        </div>
        <CardAction>
          <Button asChild size="sm" variant="outline">
            <Link href="/admin/attendance">
              Xem tất cả <ArrowRight size={16} />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="p-2">
        <ScrollArea className="h-80">
          {classes.length > 0 ? (
            classes.map((classItem, index) => (
              <ClassesTodayItem key={index} classItem={classItem} />
            ))
          ) : (
            <div
              className="text-muted-foreground/60 flex h-60 flex-col items-center justify-center gap-y-4"
              data-testid="empty-document-state"
            >
              <CircleHelp className="h-12 w-12" strokeWidth={1.5} />
              <div className="text-center">
                <h3 className="text-lg font-semibold">Không có lớp học trong hôm nay.</h3>

                <p className="mt-2 max-w-[60ch]">
                  Bạn không có lớp học nào được lên lịch cho hôm nay.
                </p>
                <p className="max-w-[60ch]">
                  Vui lòng kiểm tra email của bạn để biết thêm thông tin cập nhật.
                </p>
              </div>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ClassesToday;
