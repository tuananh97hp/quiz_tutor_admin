'use client';

import { ZCurrentPasswordSchema, ZPasswordSchema } from '@/utils/constants/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { PasswordInput } from '@/components/shared/password-input';
import { Button } from '@/components/ui/button';
import { User } from '@/types/AuthType';
import AuthService from '@/services/AuthService';
import { useSession } from 'next-auth/react';
import { AxiosError } from 'axios';
import { HTTP_CODE } from '@/utils/constants/http';
import { setErrorResponse } from '@/utils/handle';

export const ZPasswordFormSchema = z
  .object({
    old_password: ZCurrentPasswordSchema,
    new_password: ZPasswordSchema,
    new_password_verify: ZPasswordSchema,
  })
  .refine((data) => data.new_password === data.new_password_verify, {
    message: 'Passwords do not match',
    path: ['repeatedPassword'],
  });

export type TPasswordFormSchema = z.infer<typeof ZPasswordFormSchema>;

export type PasswordFormProps = {
  className?: string;
  user: User;
};

export const PasswordForm = ({ className }: PasswordFormProps) => {
  const { data: currentSession } = useSession();

  const form = useForm<TPasswordFormSchema>({
    values: {
      old_password: '',
      new_password: '',
      new_password_verify: '',
    },
    resolver: zodResolver(ZPasswordFormSchema),
  });

  const isSubmitting = form.formState.isSubmitting;

  const onFormSubmit = async (data: TPasswordFormSchema) => {
    try {
      if (!currentSession?.accessToken) return;
      await AuthService.changePassword(currentSession.accessToken, data);

      form.reset();

      toast('Your password has been updated successfully.', { type: 'success' });
    } catch (e) {
      if (e instanceof AxiosError && e.status === HTTP_CODE.UNPROCESSABLE_ENTITY) {
        setErrorResponse(e, form.setError);
      }
      toast(`Failed To force change password`, { type: 'error' });
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn('flex w-full lg:w-1/2 flex-col gap-y-4', className)}
        onSubmit={form.handleSubmit(onFormSubmit)}
      >
        <fieldset className="flex w-full flex-col gap-y-4" disabled={isSubmitting}>
          <FormField
            control={form.control}
            name="old_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Mật khẩu hiện tại</span>
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="************"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Mật khẩu mới</span>
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="************"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="new_password_verify"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Nhập lại mật khẩu mới</span>
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="************"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </fieldset>

        <div className="ml-auto mt-4">
          <Button type="submit" loading={isSubmitting}>
            {isSubmitting ? <span>Đang Đổi Mật Khẩu...</span> : <span>Đổi Mật Khẩu</span>}
          </Button>
        </div>
      </form>
    </Form>
  );
};
