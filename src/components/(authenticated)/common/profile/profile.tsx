'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User } from '@/types/AuthType';

export const ZProfileFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Please enter a valid name.' }),
});

export const ZTwoFactorAuthTokenSchema = z.object({
  token: z.string(),
});

export type TTwoFactorAuthTokenSchema = z.infer<typeof ZTwoFactorAuthTokenSchema>;
export type TProfileFormSchema = z.infer<typeof ZProfileFormSchema>;

export type ProfileFormProps = {
  className?: string;
  user: User;
};

export const ProfileForm = ({ className, user }: ProfileFormProps) => {
  const router = useRouter();

  const form = useForm<TProfileFormSchema>({
    values: {
      name: user.name ?? '',
    },
    resolver: zodResolver(ZProfileFormSchema),
  });

  const isSubmitting = form.formState.isSubmitting;

  const onFormSubmit = async ({ name }: TProfileFormSchema) => {
    try {
      // TODO: update profile
      toast('Your profile has been updated successfully.', { type: 'success' });

      router.refresh();
    } catch (err) {
      toast(
        'We encountered an unknown error while attempting to sign you In. Please try again later.',
        { type: 'error' },
      );
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn('flex w-full flex-col gap-y-4', className)}
        onSubmit={form.handleSubmit(onFormSubmit)}
      >
        <fieldset className="flex w-full flex-col gap-y-4" disabled={isSubmitting}>
          <div>
            <Label className="text-muted-foreground">Mã</Label>
            <Input id="code" type="text" className="bg-muted mt-2" value={user.id ?? ''} disabled />
          </div>
          <div>
            <Label htmlFor="email" className="text-muted-foreground">
              Tên đăng nhập
            </Label>
            <Input
              id="email"
              type="email"
              className="bg-muted mt-2"
              value={user.username}
              disabled
            />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ và Tên</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div>
            <Label htmlFor="email" className="text-muted-foreground">
              Email
            </Label>
            <Input id="email" type="email" className="bg-muted mt-2" value={user.email} disabled />
          </div>
        </fieldset>

        <Button type="submit" loading={isSubmitting} className="self-end">
          {isSubmitting ? 'Đang Cập Nhật...' : 'Cập Nhật Thông Tin'}
        </Button>
      </form>
    </Form>
  );
};
