'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';

// Types
interface IForgotPasswordFormProps {
  csrfToken: string;
}

const formSchema = z.object({
  username: z.string().email(),
});

const ForgotPasswordForm = ({ csrfToken }: IForgotPasswordFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          {/*<FormField*/}
          {/*  control={form.control}*/}
          {/*  name="username"*/}
          {/*  render={({ field }) => (*/}
          {/*    <FormItem>*/}
          {/*      <FormLabel>Tên Đăng Nhập</FormLabel>*/}
          {/*      <FormControl>*/}
          {/*        <Input placeholder="username" {...field} />*/}
          {/*      </FormControl>*/}
          {/*      <FormMessage />*/}
          {/*    </FormItem>*/}
          {/*  )}*/}
          {/*/>*/}
          {/*<Button type="submit" className="dark:bg-primary dark:hover:opacity-90 w-full">*/}
          {/*  Forgot Password*/}
          {/*</Button>*/}
        </div>
        <div className="mt-4 text-muted-foreground text-center text-sm">
          Đã nhớ mật khẩu của bạn?&nbsp;
          <a
            href="/login"
            className="text-right text-muted-foreground underline underline-offset-2 text-sm duration-200 hover:opacity-70"
          >
            Đăng Nhập
          </a>
        </div>
      </form>
    </Form>
  );
};
export default ForgotPasswordForm;
