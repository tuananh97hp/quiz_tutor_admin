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
import { FileDown, FileUp } from 'lucide-react';
import ReferrerService from '@/services/ReferrerService';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { HTTP_CODE } from '@/utils/constants/http';
import { downloadBlobFile, setErrorResponse } from '@/utils/handle';

const formSchema = z.object({
  file: z.any().refine((val) => val instanceof FileList && val.length > 0, {
    message: 'Please select a file',
  }),
});

interface IReferrerImportFormProps {}

export const ReferrerImportForm = ({}: IReferrerImportFormProps) => {
  const { data: currentSession } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!currentSession?.accessToken) return;
    try {
      const formData = new FormData();
      formData.append('file', data.file[0]);

      await ReferrerService.importReferrer(currentSession?.accessToken, formData);
      toast(`Successfully Referrer`, { type: 'success' });
      router.push('/admin/referrer');
    } catch (e) {
      if (e instanceof AxiosError && e.status === HTTP_CODE.UNPROCESSABLE_ENTITY) {
        setErrorResponse(e, form.setError);
      }
      toast(`Failed To Import excel Referrer`, { type: 'error' });
    }
  }

  async function handleDownloadTemplate() {
    if (!currentSession?.accessToken) return;
    try {
      const response = await ReferrerService.downloadImportTemplate(currentSession?.accessToken);
      downloadBlobFile(response, 'referrer_template.xlsx');
    } catch (e) {
      toast(`Failed To download template`, { type: 'error' });
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
                <hr className="mb-4" />
                <CardContent className="p-2 pb-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <div>
                        <span className="text-foreground/50 text-xs font-bold mb-2">
                          File mẫu để nhập
                        </span>
                      </div>
                      <Button type="button" onClick={handleDownloadTemplate} size="sm">
                        <FileDown /> Download file mẫu
                      </Button>
                    </div>
                    <div className="col-span-1">
                      <FormField
                        control={form.control}
                        name="file"
                        render={() => (
                          <FormItem>
                            <FormLabel required>File nhập dữ liệu</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                placeholder="Parent name"
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                {...form.register('file')}
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
              <div className="dark:bg-background border-border bg-neutral-100 flex flex-col overflow-auto rounded-xl border px-4 py-6">
                <div className="-mx-2 flex flex-1 flex-col px-2">
                  <h3 className="text-foreground text-2xl font-semibold">Nhập Excel</h3>

                  <p className="text-muted-foreground mt-2 text-sm">
                    Nhập các thông tin cần thiết như tên, giới tính, ngày bắt đầu và các thông tin
                    khác để nhập hồ sơ giới thiệu viên. Các thông tin có thể cập nhật sau khi tạo.
                  </p>

                  <hr className="border-border mb-8 mt-4" />
                  <div
                    className={cn(
                      'custom-scrollbar -mx-2 flex flex-1 flex-col overflow-hidden px-2',
                    )}
                  >
                    <div className="flex flex-1 flex-col">
                      <Button variant="import" loading={isSubmitting}>
                        <FileUp /> Tải lên Excel
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
