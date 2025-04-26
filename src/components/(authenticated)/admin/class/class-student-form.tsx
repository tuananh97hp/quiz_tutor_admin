'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { IClass, IStudent } from '@/types/models';
import { FindResultSet, ListFindResultSet } from '@/types/find-result-set';
import { DEFAULT_META_PAGINATE } from '@/utils/constants';
import ClassService from '@/services/ClassService';
import StudentService from '@/services/StudentService';
import _ from 'lodash';
import { Input } from '@/components/ui/input';
import { UnassignedStudentDataTable } from '@/components/(authenticated)/admin/class/unassigned-student-data-table';
import { AssignedStudentDataTable } from '@/components/(authenticated)/admin/class/assigned-students-table';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Users, Users2 } from 'lucide-react';
interface IAttendanceFormProps {
  classItem: IClass;
}

export const ClassStudentForm = ({ classItem }: IAttendanceFormProps) => {
  const { data: currentSession } = useSession();
  const [isPendingGetAssigned, startTransitionPendingGetAssigned] = React.useTransition();
  const [isPendingGetUnassigned, startTransitionPendingGetUnassigned] = React.useTransition();
  const [searchUnassigned, setSearchUnassigned] = React.useState<string>('');
  const [isSubmitting, startTransitionSubmit] = React.useTransition();

  const [unassignedStudents, setUnassignedStudents] = React.useState<FindResultSet<IStudent>>({
    data: [],
    meta: DEFAULT_META_PAGINATE,
  });
  const [assignedStudents, setAssignedStudents] = React.useState<ListFindResultSet<IStudent>>({
    data: [],
  });

  const router = useRouter();

  useEffect(() => {
    (async () => {
      await fetchAssignedStudents();
      await fetchUnassignedStudents();
    })();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [currentSession?.accessToken]);

  useEffect(() => {
    (async () => {
      await fetchUnassignedStudents(searchUnassigned);
    })();
  }, [searchUnassigned]);

  const fetchAssignedStudents = async () => {
    startTransitionPendingGetAssigned(async () => {
      if (currentSession?.accessToken && classItem.id) {
        try {
          const result = await ClassService.fetchStudentOfClass(
            currentSession?.accessToken,
            classItem.id,
          );
          setAssignedStudents(result);
        } catch (e) {
          console.error(e);
        }
      }
    });
  };

  const fetchUnassignedStudents = async (search?: string, page?: number, perPage?: number) => {
    startTransitionPendingGetUnassigned(async () => {
      if (currentSession?.accessToken && classItem.id) {
        try {
          const result = await StudentService.fetchDataStudent(currentSession?.accessToken, {
            search,
            page: page || 1,
            perPage: perPage || 10,
          });
          setUnassignedStudents(result);
        } catch (e) {
          console.error(e);
        }
      }
    });
  };

  const handleUnassignedPaginationChange = async (page: number, perPage: number) => {
    await fetchUnassignedStudents(searchUnassigned, page, perPage);
  };

  const handleUnassignStudent = async (student: IStudent) => {
    setAssignedStudents((prevState) => {
      return {
        ...prevState,
        data: prevState.data.filter((item) => item.id !== student.id),
      };
    });
  };

  const handleSetMonitor = async (student: IStudent) => {
    setAssignedStudents((prevState) => {
      return {
        ...prevState,
        data: prevState.data.map((item) => {
          if (item.id === student.id) {
            return {
              ...item,
              is_lesson_monitor: !item.is_lesson_monitor,
            };
          }
          return item;
        }),
      };
    });
  };

  const handleAssignStudent = async (student: IStudent) => {
    setAssignedStudents((prevState) => {
      return {
        ...prevState,
        data: [...prevState.data, student],
      };
    });
  };

  function onSubmit() {
    startTransitionSubmit(async () => {
      if (!currentSession?.accessToken) return;
      try {
        await ClassService.assignStudentToClass(currentSession?.accessToken, classItem.id, {
          students: _.map(assignedStudents.data, (std) => _.pick(std, ['id', 'is_lesson_monitor'])),
        });
        toast(`Successfully assigned students`, { type: 'success' });
        router.push('/admin/class');
      } catch (e) {
        toast(`Failed To assigned students`, { type: 'error' });
      }
    });
  }

  const unassignedStudentMemo = React.useMemo(
    () => ({
      ...unassignedStudents,
      data: _.differenceBy(unassignedStudents.data, assignedStudents.data, 'id'),
    }),
    [unassignedStudents.data, assignedStudents.data],
  );

  return (
    <>
      <div className="grid w-full grid-cols-12 gap-8">
        <div className="relative col-span-12 lg:col-span-6 xl:col-span-5">
          <Card className="relative border-2 rounded-xl before:rounded-xl bg-background">
            <CardHeader>
              <CardTitle className="text-2xl">Học sinh chưa được phân công</CardTitle>
              <CardDescription>Chọn {'>>'} nếu muốn thêm học sinh vào lớp.</CardDescription>
            </CardHeader>
            <CardContent className="p-2 pb-5">
              <Input
                type="search"
                placeholder={`Tìm kiếm học sinh ...`}
                value={searchUnassigned}
                className="mb-2"
                onChange={(e) => setSearchUnassigned(e.target.value)}
              />
              <UnassignedStudentDataTable
                results={unassignedStudentMemo}
                isPending={isPendingGetUnassigned}
                onPaginationChange={handleUnassignedPaginationChange}
                onAssign={handleAssignStudent}
              />
            </CardContent>
          </Card>
        </div>
        <div className="relative col-span-12 lg:col-span-6 xl:col-span-5">
          <Card className="relative border-2 rounded-xl before:rounded-xl bg-background">
            <CardHeader>
              <CardTitle className="text-2xl">Học sinh của lớp</CardTitle>
              <CardDescription>
                Chọn vào {'<<'} nếu muốn loại bỏ học sinh khỏi lớp. Chọn vào checkbox nếu muốn học
                sinh làm lớp trưởng. Lớp trưởng được phép điểm danh lớp học khi có tiết.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pb-5">
              <AssignedStudentDataTable
                results={assignedStudents}
                isPending={isPendingGetAssigned}
                onUnassign={handleUnassignStudent}
                onSetMonitor={handleSetMonitor}
              />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-12 xl:col-span-2">
          <div className="dark:bg-background border-border bg-neutral-100 sticky top-20 flex flex-col overflow-auto rounded-xl border px-4 py-6">
            <div className="-mx-2 flex flex-1 flex-col px-2">
              <h3 className="text-foreground text-2xl font-semibold">Lớp: {classItem.name}</h3>

              <hr className="border-border mb-8 mt-4" />
              <div className="flex gap-5">
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                    <Users /> Tổng số học sinh
                  </div>
                  <div className="text-2xl font-semibold">{assignedStudents.data.length}</div>
                </div>
              </div>
              <hr className="border-border mb-8 mt-4" />
              <div
                className={cn('custom-scrollbar -mx-2 flex flex-1 flex-col overflow-hidden px-2')}
              >
                <div className="flex flex-1 flex-col">
                  <Button loading={isSubmitting} onClick={onSubmit}>
                    <Users2 />
                    Lưu lại
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
