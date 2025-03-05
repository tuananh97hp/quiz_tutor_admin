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
import { PasswordInput } from '@/components/shared/password-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { setCookie } from '@/utils/cookies';
import { STORAGE_KEYS } from '@/utils/constants';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/router/routes';

// Types
interface ILoginFormProps {
  csrfToken: string;
}

const formSchema = z.object({
  username: z.string().email(),
  password: z.string().nonempty(),
});

const LoginForm = ({ csrfToken }: ILoginFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    return;
    signIn('credentials', {
      redirect: true,
      callbackUrl: '/',
    })
      .then(() => {
        setCookie(STORAGE_KEYS.CSRF_TOKEN, csrfToken);
        redirect(ROUTES.HOME_PAGE);
      })
      .finally(() => {});
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="user@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <a
              href="/forgot-password"
              className="text-right text-muted-foreground text-sm duration-200 hover:opacity-70"
            >
              Forgot your password?
            </a>
          </div>
          <Button type="submit" className="dark:bg-primary dark:hover:opacity-90 w-full">
            Login
          </Button>
        </div>
        <div className="mt-4 text-muted-foreground text-center text-sm">
          Don&apos;t have an account? Contact admin to create one.
        </div>
      </form>
    </Form>
  );
};
export default LoginForm;
