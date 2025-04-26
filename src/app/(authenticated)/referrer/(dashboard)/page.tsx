import { getCurrentAccessToken } from '@/utils/session';
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
import React from 'react';

const HomePage = async () => {
  const accessToken = await getCurrentAccessToken();
  return (
    <div className="mx-auto -mt-4 w-full max-w-screen-2xl px-4 md:px-8">
      <h2 className="text-2xl font-bold tracking-tight">Xin chào, chào mừng bạn trở lại 👋</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="w-full mt-10">
          <Card className="@container/card h-full bg-white">
            <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
              <div className="grid flex-1 gap-1 text-center sm:text-left">
                <CardTitle>New Customers</CardTitle>
                <CardDescription>New Customers</CardDescription>
              </div>
              <CardAction>
                <Button asChild size="sm" variant="outline">
                  <Link href="/attendance/student">
                    See all <ArrowRight size={16} />
                  </Link>
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="p-2">
              <ScrollArea className="h-80">
                <Card className="hover:animate-gradient grid grid-cols-1 gap-2 rounded-xl border border-transparent bg-none p-2 transition-all duration-300 before:rounded-xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-transparent dark:hover:from-blue-950 mb-4">
                  <CardContent className="m-0 flex h-full items-center justify-between p-0 md:h-24">
                    {/* Left Section */}
                    <div className="p-4 pl-5">
                      <CardTitle className="text-xl">Lorem ipsum</CardTitle>
                      <div className="mt-2 flex flex-col gap-2 md:flex-row">
                        <Badge variant={'neutral'}>attendance</Badge>
                        <Badge variant="secondary">Teacher Approved</Badge>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex h-full w-1/2 items-center justify-end md:justify-start">
                      <div className="flex gap-4 px-4">
                        <Settings className="text-muted-foreground h-6 w-6" />
                        {/*<DataTableActionDropdown data={job} jobRootPath={jobRootPath} />*/}
                      </div>
                      <div className="hidden h-full w-full flex-col items-start justify-center border-l-2 border-slate-200 px-8 py-8 md:flex dark:border-l-neutral-700">
                        <div className="flex w-full items-center justify-between space-x-2">
                          <div className="flex gap-2">
                            <Inbox className="text-muted-foreground h-5 w-5" />
                            <p className="text-sm">Processing</p>
                          </div>
                          <p className="text-lg font-semibold">10</p>
                        </div>
                        <div className="mt-4 flex w-full items-center justify-between space-x-2">
                          <div className="flex gap-2">
                            <Users className="text-muted-foreground h-5 w-5" />
                            <p className="text-sm">Total Candidates</p>
                          </div>
                          <p className="text-lg font-semibold">20</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:animate-gradient grid grid-cols-1 gap-2 rounded-xl border border-transparent bg-none p-2 transition-all duration-300 before:rounded-xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-transparent dark:hover:from-blue-950 mb-4">
                  <CardContent className="m-0 flex h-full items-center justify-between p-0 md:h-24">
                    {/* Left Section */}
                    <div className="p-4 pl-5">
                      <CardTitle className="text-xl">Lorem ipsum</CardTitle>
                      <div className="mt-2 flex flex-col gap-2 md:flex-row">
                        <Badge variant={'neutral'}>attendance</Badge>
                        <Badge variant="secondary">Teacher Approved</Badge>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex h-full w-1/2 items-center justify-end md:justify-start">
                      <div className="flex gap-4 px-4">
                        <Settings className="text-muted-foreground h-6 w-6" />
                        {/*<DataTableActionDropdown data={job} jobRootPath={jobRootPath} />*/}
                      </div>
                      <div className="hidden h-full w-full flex-col items-start justify-center border-l-2 border-slate-200 px-8 py-8 md:flex dark:border-l-neutral-700">
                        <div className="flex w-full items-center justify-between space-x-2">
                          <div className="flex gap-2">
                            <Inbox className="text-muted-foreground h-5 w-5" />
                            <p className="text-sm">Processing</p>
                          </div>
                          <p className="text-lg font-semibold">10</p>
                        </div>
                        <div className="mt-4 flex w-full items-center justify-between space-x-2">
                          <div className="flex gap-2">
                            <Users className="text-muted-foreground h-5 w-5" />
                            <p className="text-sm">Total Candidates</p>
                          </div>
                          <p className="text-lg font-semibold">20</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:animate-gradient grid grid-cols-1 gap-2 rounded-xl border border-transparent bg-none p-2 transition-all duration-300 before:rounded-xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-transparent dark:hover:from-blue-950 mb-4">
                  <CardContent className="m-0 flex h-full items-center justify-between p-0 md:h-24">
                    {/* Left Section */}
                    <div className="p-4 pl-5">
                      <CardTitle className="text-xl">Lorem ipsum</CardTitle>
                      <div className="mt-2 flex flex-col gap-2 md:flex-row">
                        <Badge variant={'neutral'}>attendance</Badge>
                        <Badge variant="secondary">Teacher Approved</Badge>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex h-full w-1/2 items-center justify-end md:justify-start">
                      <div className="flex gap-4 px-4">
                        <Settings className="text-muted-foreground h-6 w-6" />
                        {/*<DataTableActionDropdown data={job} jobRootPath={jobRootPath} />*/}
                      </div>
                      <div className="hidden h-full w-full flex-col items-start justify-center border-l-2 border-slate-200 px-8 py-8 md:flex dark:border-l-neutral-700">
                        <div className="flex w-full items-center justify-between space-x-2">
                          <div className="flex gap-2">
                            <Inbox className="text-muted-foreground h-5 w-5" />
                            <p className="text-sm">Processing</p>
                          </div>
                          <p className="text-lg font-semibold">10</p>
                        </div>
                        <div className="mt-4 flex w-full items-center justify-between space-x-2">
                          <div className="flex gap-2">
                            <Users className="text-muted-foreground h-5 w-5" />
                            <p className="text-sm">Total Candidates</p>
                          </div>
                          <p className="text-lg font-semibold">20</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollArea>
            </CardContent>
          </Card>
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
