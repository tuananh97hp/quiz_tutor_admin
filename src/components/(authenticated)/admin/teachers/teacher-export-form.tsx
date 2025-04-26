'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { InputDatePicker } from '@/components/ui/input-date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TeacherService from '@/services/TeacherService';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { HTTP_CODE } from '@/utils/constants/http';
import { downloadBlobFile, setErrorResponse } from '@/utils/handle';
import { MultiSelectCombobox } from '@/components/ui/multi-select-combobox';
import { TEACHER_STATUS } from '@/utils/constants';

const formSchema = z.object({
  status: z.array(z.string()).optional(),
  gender: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

const statusOptions = [
  { value: TEACHER_STATUS.PROCESSING, label: 'Processing' },
  { value: TEACHER_STATUS.ACTIVE, label: 'Active' },
  { value: TEACHER_STATUS.INACTIVE, label: 'Inactive' },
];

interface ITeacherFormProps {}

export const TeacherExportForm = ({}: ITeacherFormProps) => {
  const { data: currentSession } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!currentSession?.accessToken) return;
    try {
      const response = await TeacherService.exportTeacher(currentSession?.accessToken, data);
      downloadBlobFile(response, 'teachers.xlsx');
    } catch (e) {
      if (e instanceof AxiosError && e.status === HTTP_CODE.UNPROCESSABLE_ENTITY) {
        setErrorResponse(e, form.setError);
      }
      toast(`Failed To export excel Teacher`, { type: 'error' });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full grid-cols-12 gap-8">
            <div className="relative col-span-12 lg:col-span-8 xl:col-span-7">
              <Card className="relative border-2 rounded-xl before:rounded-xl bg-background">
                <CardHeader>
                  <CardTitle className="text-2xl">Thông tin xuất excel</CardTitle>
                  <CardDescription>
                    Sử dụng các bộ lọc bên dưới để tùy chỉnh dữ liệu bạn muốn xuất.
                  </CardDescription>
                </CardHeader>
                <hr className="mb-4" />
                <CardContent className="p-4 pb-5">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Giới tính</FormLabel>
                            <FormControl>
                              <Select defaultValue={field.value} onValueChange={field.onChange}>
                                <SelectTrigger aria-invalid={fieldState.invalid}>
                                  <SelectValue placeholder="Tất cả" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Trạng thái</FormLabel>
                            <FormControl>
                              <MultiSelectCombobox
                                emptySelectionPlaceholder="Tất cả"
                                onChange={field.onChange}
                                selectedValues={field.value || []}
                                options={statusOptions}
                                enableClearAllButton={true}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="start_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ngày bắt đầu từ</FormLabel>
                            <FormControl>
                              <InputDatePicker onChangeDate={field.onChange} value={field.value} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="end_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ngày bắt đầu đến</FormLabel>
                            <FormControl>
                              <InputDatePicker onChangeDate={field.onChange} value={field.value} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-4 xl:col-span-5">
              <div className="dark:bg-background border-border bg-neutral-100 flex-col overflow-auto rounded-xl border px-4 py-6">
                <div className="-mx-2 flex flex-1 flex-col px-2">
                  <h3 className="text-foreground text-2xl font-semibold">Xuất Excel</h3>

                  <p className="text-muted-foreground mt-2 text-sm">
                    Các thông tin giáo viên sẽ được xuất theo bộ lọc bạn đã lựa chọn.
                  </p>

                  <hr className="border-border mb-8 mt-4" />
                  <div
                    className={cn(
                      'custom-scrollbar -mx-2 flex flex-1 flex-col overflow-hidden px-2',
                    )}
                  >
                    <div className="flex flex-1 flex-col">
                      <Button variant="export" loading={isSubmitting}>
                        <FileDown /> Xuất Excel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
