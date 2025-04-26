'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZCurrentPasswordSchema, ZPasswordSchema } from '@/utils/constants/schema';
import { PasswordInput } from '@/components/shared/password-input';
import AuthService from '@/services/AuthService';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { HTTP_CODE } from '@/utils/constants/http';
import { setErrorResponse } from '@/utils/handle';
import { useSearchParams } from 'next/navigation';
import { AxiosError } from 'axios';

const formSchema = z
  .object({
    old_password: ZCurrentPasswordSchema,
    new_password: ZPasswordSchema,
    new_password_verify: ZPasswordSchema,
  })
  .refine((data) => data.new_password === data.new_password_verify, {
    message: 'Passwords do not match',
    path: ['repeatedPassword'],
  });

const ForceChangePasswordForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const { data: currentSession, update } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const isSubmitting = form.formState.isSubmitting;
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      if (!currentSession?.accessToken) return;
      await AuthService.changePassword(currentSession.accessToken, data);
      toast(`Successfully force change password`, { type: 'success' });
      await update({
        force_change_password: false,
      });
      await signIn('credentials', {
        redirect: true,
        callbackUrl,
      });
    } catch (e) {
      if (e instanceof AxiosError && e.status === HTTP_CODE.UNPROCESSABLE_ENTITY) {
        setErrorResponse(e, form.setError);
      }
      toast(`Failed To force change password`, { type: 'error' });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="old_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật Khẩu Hiện Tại</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Mật khẩu hiện tại" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật Khẩu</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Mật khẩu mới" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="new_password_verify"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nhập Lại Mật Khẩu</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Nhập lại mật khẩu mới" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            loading={isSubmitting}
            className="dark:bg-primary dark:hover:opacity-90 w-full"
          >
            Đổi Mật Khẩu
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default ForceChangePasswordForm;
