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
import { IconTrendingDown } from '@tabler/icons-react';
import React from 'react';

const LessonsMonth = () => {
  return (
    <Card className="@container/card">
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>New Customers</CardTitle>
          <CardDescription>New Customers</CardDescription>
        </div>
        <CardAction>
          <Badge size="small" variant="destructive">
            <IconTrendingDown />
            -20%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          1,234
        </CardTitle>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Down 20% this period <IconTrendingDown className="size-4" />
        </div>
        <div className="text-muted-foreground">Acquisition needs attention</div>
      </CardFooter>
    </Card>
  );
};

export default LessonsMonth;
