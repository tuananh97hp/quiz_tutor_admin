import React from 'react';
import { BarChartMultiple } from '@/components/(authenticated)/admin/dashboard/bar-chart-multiple';
import { PieChartDonut } from '@/components/(authenticated)/admin/dashboard/pie-chart-donut';
import { AreaChartInteractive } from '@/components/(authenticated)/admin/dashboard/area-chart-interactive';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowRight, Inbox, Settings, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Metadata } from 'next';
import UpcomingClass from '@/components/(authenticated)/admin/dashboard/upcoming-class';
import AlertDialogConfirm from '@/components/shared/alert-dialog-confirm';

export const metadata: Metadata = {
  title: 'Admin | Tổng Quan',
};

const HomePage = async () => {
  return (
    <div className="mx-auto -mt-4 w-full max-w-screen-2xl px-4 md:px-8">
      <h2 className="text-2xl font-bold tracking-tight">Xin chào, chào mừng bạn trở lại 👋</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="w-full mt-10">
          <UpcomingClass />
        </div>
        <div className="w-full mt-10 grid grid-cols-2 gap-4 md:grid-cols-2">
          <Card className="@container/card">
            <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
              <div className="grid flex-1 gap-1 text-center sm:text-left">
                <CardTitle>Total Revenue</CardTitle>
                <CardDescription>Total Revenue</CardDescription>
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
                $1,250.00
              </CardTitle>
            </CardContent>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Trending up this month <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">Visitors for the last 6 months</div>
            </CardFooter>
          </Card>
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
          <Card className="@container/card">
            <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
              <div className="grid flex-1 gap-1 text-center sm:text-left">
                <CardTitle>Growth Rate</CardTitle>
                <CardDescription>Growth Rate</CardDescription>
              </div>
              <CardAction>
                <Badge size="small" variant="destructive">
                  <IconTrendingUp />
                  +4.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                4.5%
              </CardTitle>
            </CardContent>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Steady performance increase <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">Meets growth projections</div>
            </CardFooter>
          </Card>
        </div>
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
