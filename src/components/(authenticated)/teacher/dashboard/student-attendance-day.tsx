import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IconTrendingUp } from '@tabler/icons-react';
import React from 'react';

const StudentAttendanceDay = () => {
  return (
    <Card className="@container/card">
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Active Accounts</CardTitle>
          <CardDescription>Active Accounts</CardDescription>
        </div>
        <CardAction>
          <Badge size="small">
            <IconTrendingUp />
            +12.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          45,678
        </CardTitle>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Strong user retention <IconTrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">Engagement exceed targets</div>
      </CardFooter>
    </Card>
  );
};

export default StudentAttendanceDay;
