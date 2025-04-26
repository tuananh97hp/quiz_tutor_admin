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
import React from 'react';
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
import ReferrerService from '@/services/ReferrerService';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { HTTP_CODE } from '@/utils/constants/http';
import { setErrorResponse } from '@/utils/handle';
import { IReferrer } from '@/types/models';
import _ from 'lodash';

const formSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  phone_number: z.string().min(10).max(11).optional(),
  birth_date: z.string().optional(),
  address: z.string().optional(),
  gender: z.string().nonempty(),
  start_date: z.string().nonempty(),
  description: z.string().optional(),
});

interface IReferrerFormProps {
  referrer?: IReferrer;
}

export const ReferrerForm = ({ referrer }: IReferrerFormProps) => {
  const { data: currentSession } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: _.omitBy(referrer, _.isNil) || {},
  });
  const isSubmitting = form.formState.isSubmitting;
  const isEditing = !!referrer;
  const textEditing = !!referrer ? 'Chỉnh sửa' : 'Thêm mới';

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!currentSession?.accessToken) return;
    try {
      if (isEditing) {
        await ReferrerService.updateReferrer(currentSession?.accessToken, referrer.id, data);
      } else {
        await ReferrerService.createReferrer(currentSession?.accessToken, data);
      }
      toast(`Successfully ${textEditing} Referrer`, { type: 'success' });
      router.push('/admin/referrer');
    } catch (e) {
      if (e instanceof AxiosError && e.status === HTTP_CODE.UNPROCESSABLE_ENTITY) {
        setErrorResponse(e, form.setError);
      }
      toast(`Failed To ${textEditing} Referrer`, { type: 'error' });
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
                  <CardTitle className="text-2xl">Thông tin giới thiệu viên</CardTitle>
                  <CardDescription>
                    Các trường có dấu <span className="text-red-500">*</span> là bắt bộc. Vui lòng
                    điền vào trước khi gửi.
                  </CardDescription>
                </CardHeader>
                <hr className="border-border" />
                <CardContent className="p-2 pb-5">
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
                                <SelectValue placeholder="Chọn giới tính" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Nam</SelectItem>
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
                            <Input placeholder="Email" {...field} />
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
                            <Input placeholder="DD-MM-YYYY" {...field} />
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
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Mô tả ngắn về giới thiệu viên ..."
                                {...field}
                              />
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
              <div className="dark:bg-background border-border bg-neutral-100 sticky top-20 flex flex-col overflow-auto rounded-xl border px-4 py-6">
                <div className="-mx-2 flex flex-1 flex-col px-2">
                  <h3 className="text-foreground text-2xl font-semibold">{textEditing}</h3>

                  <p className="text-muted-foreground mt-2 text-sm">
                    Nhập các thông tin cần thiết như tên, giới tính, ngày bắt đầu và các thông tin
                    khác để {textEditing} hồ sơ sinh viên. Các thông tin có thể cập nhật sau khi
                    tạo.
                  </p>

                  <hr className="border-border mb-8 mt-4" />
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
