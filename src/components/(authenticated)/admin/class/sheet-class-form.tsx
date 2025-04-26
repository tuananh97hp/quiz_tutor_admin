'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { BookPlus, CirclePlus, Trash } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import _ from 'lodash';
import { IClass, IStudent, ITeacher } from '@/types/models';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { HTTP_CODE } from '@/utils/constants/http';
import { setErrorResponse } from '@/utils/handle';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ClassService from '@/services/ClassService';
import { InputDatePicker } from '@/components/ui/input-date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DAY_OF_WEEK } from '@/utils/constants/date';
import { DialogProps } from '@radix-ui/react-dialog';
import { SingleSelectCombobox } from '@/components/ui/single-select-combobox';
import TeacherService from '@/services/TeacherService';

const formSchema = z.object({
  name: z.string(),
  start_date: z.string().nonempty(),
  fee: z.preprocess((value) => Number(value), z.number().min(10)),
  schedules: z
    .array(
      z.object({
        day_of_week: z.string().nonempty(),
        start_time: z.string().nonempty(),
        end_time: z.string().nonempty(),
      }),
    )
    .optional(),
  teacher_id: z.number().optional(),
});
const defaultValues = {
  schedules: [],
};

interface IClassFormProps extends DialogProps {
  hideTrigger?: boolean;
  classItem?: IClass;
}
export function SheetClassForm({
  classItem,
  open: isOpen = false,
  hideTrigger = false,
  onOpenChange,
}: IClassFormProps) {
  const { data: currentSession } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [teachers, setTeachers] = React.useState<ITeacher[]>([]);
  const [isLoadingTeachers, startTransitionLoadingTeachers] = React.useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: classItem ? _.omitBy(classItem, _.isNil) : defaultValues,
  });

  const schedulesWatcher = form.watch('schedules');
  const isSubmitting = form.formState.isSubmitting;
  const isEditing = !!classItem;
  const textEditing = !!classItem ? 'Chỉnh sửa' : 'Thêm mới';
  useEffect(() => {
    handleChangeSearchTeacher('');
    setOpen(isOpen);
  }, [isOpen]);

  const handleAddSchedule = () => {
    const schedules = form.getValues('schedules') || [];
    schedules.push({
      day_of_week: '0',
      start_time: '',
      end_time: '',
    });
    form.setValue('schedules', schedules);
  };
  const handleRemoveSchedule = (index: number) => {
    const schedules = form.getValues('schedules') || [];
    schedules.splice(index, 1);

    form.setValue('schedules', schedules);
  };

  const handleChangeSearchTeacher = (value: string) => {
    startTransitionLoadingTeachers(async () => {
      if (currentSession?.accessToken) {
        try {
          const { data } = await TeacherService.fetchDataTeacher(currentSession?.accessToken, {
            search: value,
            teacher_id: form.getValues('teacher_id'),
          });
          setTeachers(data);
        } catch (e) {
          console.error(e);
        }
      }
    });
  };
  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!currentSession?.accessToken) return;
    try {
      if (isEditing) {
        await ClassService.updateClass(currentSession?.accessToken, classItem.id, data);
      } else {
        await ClassService.createClass(currentSession?.accessToken, data);
      }
      onOpenChange && onOpenChange(false);
      setOpen(false);
      toast(`Successfully ${textEditing} Class`, { type: 'success' });
      router.refresh();
    } catch (e) {
      if (e instanceof AxiosError && e.status === HTTP_CODE.UNPROCESSABLE_ENTITY) {
        setErrorResponse(e, form.setError);
      }
      toast(`Failed to ${textEditing} Class`, { type: 'error' });
    }
  }

  const handleOpenChange = (value: boolean) => {
    onOpenChange && onOpenChange(value);
    setOpen(value);
    form.reset();
  };

  const teachersOptions = useMemo(() => {
    return teachers.map((teacher) => ({
      value: teacher.id,
      label: `(${teacher.id}) ${teacher.name}`,
    }));
  }, [teachers]);

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      {!hideTrigger && (
        <SheetTrigger asChild>
          <Button>
            <BookPlus /> Tạo Mới
          </Button>
        </SheetTrigger>
      )}
      <SheetContent className="md:max-w-xl sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Tạo Mới Lớp Học</SheetTitle>
          <SheetDescription>
            Các trường có dấu <span className="text-red-500">*</span> là bắt bộc. Vui lòng điền vào
            trước khi gửi.
          </SheetDescription>
        </SheetHeader>
        <div className="mb-4 mt-2">
          <hr className="border-border" />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Tên lớp học</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên lớp học" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="start_date"
                render={({ field: { onChange, value }, fieldState }) => (
                  <FormItem>
                    <FormLabel required>Ngày bắt đầu</FormLabel>
                    <FormControl>
                      <InputDatePicker
                        aria-invalid={fieldState.invalid}
                        value={value}
                        onChangeDate={onChange}
                        placeholder="DD-MM-YYYY"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Học Phí</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="10xxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teacher_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giáo viên</FormLabel>
                    <FormControl>
                      <SingleSelectCombobox
                        selectedValue={field.value}
                        onChange={field.onChange}
                        onChangeSearch={handleChangeSearchTeacher}
                        emptySelectionPlaceholder="Chọn giáo viên cho lớp ..."
                        options={teachersOptions}
                        loadingSearch={isLoadingTeachers}
                        enableClearAllButton={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-6 mb-4">
              <span className="flex text-foreground/50 items-center text-xs font-bold">
                Lịch học:
                <Button
                  onClick={handleAddSchedule}
                  className="rounded-full ml-2 p-0 w-8 h-8"
                  variant="outline"
                >
                  <CirclePlus />
                </Button>
              </span>
              <hr className="border-border" />
            </div>
            <div className="grid grid-cols-1 gap-2">
              {schedulesWatcher &&
                schedulesWatcher.map((schedule, index) => (
                  <div className="grid grid-cols-10 gap-4" key={index}>
                    <div className="col-span-3">
                      <FormField
                        control={form.control}
                        name={`schedules.${index}.start_time`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel required>Giờ bắt đầu</FormLabel>
                            <FormControl>
                              <Input className="w-auto" type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-3">
                      <FormField
                        control={form.control}
                        name={`schedules.${index}.end_time`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel required>Giờ kết thúc</FormLabel>
                            <FormControl>
                              <Input className="w-auto" type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-3">
                      <FormField
                        control={form.control}
                        name={`schedules.${index}.day_of_week`}
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel required>Thứ</FormLabel>
                            <FormControl>
                              <Select defaultValue={field.value} onValueChange={field.onChange}>
                                <SelectTrigger aria-invalid={fieldState.invalid}>
                                  <SelectValue placeholder="Select a day of week" />
                                </SelectTrigger>
                                <SelectContent>
                                  {DAY_OF_WEEK.map((day, indexDay) => (
                                    <SelectItem key={indexDay} value={'' + indexDay}>
                                      {day}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <Button
                        onClick={() => handleRemoveSchedule(index)}
                        size="sm"
                        variant="outline"
                        aria-label="Add"
                        className="mt-8"
                      >
                        <Trash />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>

            <div className="mb-4 mt-4">
              <hr className="border-border" />
            </div>
            <div className="w-full flex flex-col items-center">
              <p className="text-muted-foreground mt-2 mb-2 text-sm">
                Nhập thông tin cần thiết như tên, ngày bắt đầu và các chi tiết khác để {textEditing}
                &nbsp;lớp học.
              </p>
              <Button type="submit" loading={isSubmitting} className="w-full">
                <BookPlus /> {textEditing} lớp
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
