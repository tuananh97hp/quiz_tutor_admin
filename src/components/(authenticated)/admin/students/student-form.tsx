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
import { Input } from '@/components/ui/input';
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { InputDatePicker } from '@/components/ui/input-date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import StudentService from '@/services/StudentService';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { HTTP_CODE } from '@/utils/constants/http';
import { setErrorResponse } from '@/utils/handle';
import { IReferrer, IStudent } from '@/types/models';
import _ from 'lodash';
import { SingleSelectCombobox } from '@/components/ui/single-select-combobox';
import ReferrerService from '@/services/ReferrerService';

const formSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  referrer_id: z.number().optional(),
  phone_number: z.string().min(10).max(11).optional(),
  birth_date: z.string().optional(),
  address: z.string().optional(),
  gender: z.string().nonempty(),
  start_date: z.string().nonempty(),
  description: z.string().optional(),
  parent_name: z.string().optional(),
  parent_phone_number: z.string().min(10).max(11).optional(),
});

interface IStudentFormProps {
  student?: IStudent;
}

export const StudentForm = ({ student }: IStudentFormProps) => {
  const { data: currentSession } = useSession();
  const router = useRouter();
  const [referrers, setReferrers] = React.useState<IReferrer[]>([]);
  const [isLoadingReferrers, startTransitionLoadingReferrers] = React.useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: _.omitBy(student, _.isNil) || {},
  });
  const isSubmitting = form.formState.isSubmitting;
  const isEditing = !!student;
  const textEditing = !!student ? 'Chỉnh sửa' : 'Thêm mới';

  useEffect(() => {
    handleChangeSearchReferrer('');
  }, []);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!currentSession?.accessToken) return;
    try {
      if (isEditing) {
        await StudentService.updateStudent(currentSession?.accessToken, student.id, data);
      } else {
        await StudentService.createStudent(currentSession?.accessToken, data);
      }
      toast(`Successfully ${textEditing} Student`, { type: 'success' });
      router.push('/admin/student');
    } catch (e) {
      if (e instanceof AxiosError && e.status === HTTP_CODE.UNPROCESSABLE_ENTITY) {
        setErrorResponse(e, form.setError);
      }
      toast(`Failed To ${textEditing} Student`, { type: 'error' });
    }
  }

  const handleChangeSearchReferrer = (value: string) => {
    startTransitionLoadingReferrers(async () => {
      if (currentSession?.accessToken) {
        try {
          const { data } = await ReferrerService.fetchDataReferrer(currentSession?.accessToken, {
            search: value,
            referrer_id: form.getValues('referrer_id'),
          });
          setReferrers(data);
        } catch (e) {
          console.error(e);
        }
      }
    });
  };

  const referrersOptions = referrers.map((referrer) => ({
    value: referrer.id,
    label: `(${referrer.id}) ${referrer.name}`,
  }));

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full grid-cols-12 gap-8">
            <div className="relative col-span-12 lg:col-span-8 xl:col-span-7">
              <Card className="relative border-2 rounded-xl before:rounded-xl bg-background">
                <CardHeader>
                  <CardTitle className="text-2xl">Thông Tin Học Sinh</CardTitle>
                  <CardDescription>
                    Các trường có dấu <span className="text-red-500">*</span> là bắt bộc. Vui lòng
                    điền vào trước khi gửi.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pb-5">
                  <div className="mb-4">
                    <span className="text-foreground/50 text-xs font-bold mb-2">
                      Thông tin học sinh
                    </span>
                    <hr className="border-border" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>Họ và Tên</FormLabel>
                          <FormControl>
                            <Input placeholder="Nguyễn Văn A" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel required>Giới tính</FormLabel>
                          <FormControl>
                            <Select defaultValue={field.value} onValueChange={field.onChange}>
                              <SelectTrigger aria-invalid={fieldState.invalid}>
                                <SelectValue placeholder="Select a gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Name</SelectItem>
                                <SelectItem value="female">Nữ</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="example@gmail.com" {...field} />
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
                          <FormLabel required>Ngày nhập học</FormLabel>
                          <FormControl>
                            <InputDatePicker
                              aria-invalid={fieldState.invalid}
                              value={value}
                              onChangeDate={onChange}
                              placeholder="0000/00/00"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số điện thoại</FormLabel>
                          <FormControl>
                            <Input placeholder="09xxxxxxxx" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="birth_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ngày sinh</FormLabel>
                          <FormControl>
                            <Input placeholder="YYYY-MM-DD" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Địa chỉ</FormLabel>
                          <FormControl>
                            <Input placeholder="số nhà x - đường y - Hải Phòng" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mô tả ngắn</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Mô tả ngắn về học sinh ..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-6 mb-4">
                    <span className="text-foreground/50 text-xs font-bold">
                      Thông tin phụ huynh
                    </span>
                    <hr className="border-border" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="parent_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên phụ huynh</FormLabel>
                          <FormControl>
                            <Input placeholder="Nguyễn Văn B" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="parent_phone_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số điện thoại phụ huynh</FormLabel>
                          <FormControl>
                            <Input placeholder="09xxxxxxxx" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-4 xl:col-span-5">
              <div className="dark:bg-background border-border bg-neutral-100 sticky top-20 flex flex-col overflow-auto rounded-xl border px-4 py-6">
                <div className="-mx-2 flex flex-1 flex-col px-2">
                  <h3 className="text-foreground text-2xl font-semibold">{textEditing}</h3>

                  <p className="text-muted-foreground mt-2 text-sm">
                    Nhập các thông tin cần thiết như tên, giới tính, ngày nhập học và các thông tin
                    khác để {textEditing} hồ sơ sinh viên. Các thông tin có thể cập nhật sau khi
                    tạo.
                  </p>

                  <hr className="border-border mb-4 mt-4" />

                  <div className="mb-4">
                    <FormField
                      control={form.control}
                      name="referrer_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Người giới thiệu</FormLabel>
                          <FormControl>
                            <div>
                              <SingleSelectCombobox
                                selectedValue={field.value}
                                onChange={field.onChange}
                                onChangeSearch={handleChangeSearchReferrer}
                                emptySelectionPlaceholder="Chọn người giới thiệu ..."
                                options={referrersOptions}
                                loadingSearch={isLoadingReferrers}
                                enableClearAllButton={true}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div
                    className={cn(
                      'custom-scrollbar -mx-2 flex flex-1 flex-col overflow-hidden px-2',
                    )}
                  >
                    <div className="flex flex-1 flex-col">
                      <Button loading={isSubmitting}>
                        <UserPlus />
                        {textEditing}
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
