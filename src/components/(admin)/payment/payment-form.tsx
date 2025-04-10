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
import PaymentService from '@/services/PaymentService';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { HTTP_CODE } from '@/utils/constants/http';
import { setErrorResponse } from '@/utils/handle';
import { IPayment } from '@/types/models';
import _ from 'lodash';
import { MultiSelectCombobox } from '@/components/ui/multi-select-combobox';

const formSchema = z.object({
  first_name: z.string(),
  last_name: z.string().optional(),
  email: z.string().email().optional(),
  phone_number: z.string().min(10).max(11).optional(),
  birth_date: z.string().optional(),
  address: z.string().optional(),
  gender: z.string().nonempty(),
  start_date: z.string().nonempty(),
  description: z.string().optional(),
  parent_name: z.string().optional(),
  parent_phone_number: z.string().min(10).max(11).optional(),
});

interface IPaymentFormProps {
  payment?: IPayment;
}

export const PaymentForm = ({ payment }: IPaymentFormProps) => {
  const { data: currentSession } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: _.omitBy(payment, _.isNil) || {},
  });
  const isSubmitting = form.formState.isSubmitting;
  const isEditing = !!payment;
  const textEditing = !!payment ? 'Update' : 'Add New';

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!currentSession?.accessToken) return;
    try {
      if (isEditing) {
        await PaymentService.updatePayment(currentSession?.accessToken, payment.id, data);
      } else {
        await PaymentService.createPayment(currentSession?.accessToken, data);
      }
      toast(`Successfully ${textEditing} Payment`, { type: 'success' });
      router.push('/payment');
    } catch (e) {
      if (e instanceof AxiosError && e.status === HTTP_CODE.UNPROCESSABLE_ENTITY) {
        setErrorResponse(e, form.setError);
      }
      toast(`Failed To ${textEditing} Payment`, { type: 'error' });
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
                  <CardTitle className="text-2xl">Payment Information</CardTitle>
                  <CardDescription>
                    Fields marked with <span className="text-red-500">*</span> are required. Please
                    fill them in before submitting.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pb-5">
                  <div className="mb-4">
                    <span className="text-foreground/50 text-xs font-bold mb-2">
                      Payment Fields
                    </span>
                    <hr className="border-border" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <MultiSelectCombobox
                      onChange={(_values) => {
                        console.log(_values);
                      }}
                      options={[
                        {
                          label: 'Option 1',
                          value: 1,
                        },
                      ]}
                      isMultiple={true}
                      selectedValues={[]}
                    />
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="First name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Last Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel required>Gender</FormLabel>
                          <FormControl>
                            <Select defaultValue={field.value} onValueChange={field.onChange}>
                              <SelectTrigger aria-invalid={fieldState.invalid}>
                                <SelectValue placeholder="Select a gender" />
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
                          <FormLabel required>Start Date</FormLabel>
                          <FormControl>
                            <InputDatePicker
                              aria-invalid={fieldState.invalid}
                              value={value}
                              onChangeDate={onChange}
                              placeholder="Start date"
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
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Phone Number" {...field} />
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
                          <FormLabel>Birth Date</FormLabel>
                          <FormControl>
                            <Input placeholder="Birth date" {...field} />
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
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Address" {...field} />
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
                              <Textarea placeholder="Description ..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-6 mb-4">
                    <span className="text-foreground/50 text-xs font-bold">Parent Fields</span>
                    <hr className="border-border" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="parent_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parent Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Parent name" {...field} />
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
                          <FormLabel>Parent Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Parent phone number" {...field} />
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
              <div className="dark:bg-background border-border bg-neutral-100 sticky top-20 flex h-full max-h-[64rem] flex-col overflow-auto rounded-xl border px-4 py-6 lg:h-[calc(100vh-20rem)]">
                <div className="-mx-2 flex flex-1 flex-col px-2">
                  <h3 className="text-foreground text-2xl font-semibold">{textEditing} Payment</h3>

                  <p className="text-muted-foreground mt-2 text-sm">
                    Enter the necessary information such as name, payment ID, class, and other
                    details to {textEditing} a payment profile.
                  </p>

                  <hr className="border-border mb-8 mt-4" />
                  <div
                    className={cn(
                      'custom-scrollbar -mx-2 flex flex-1 flex-col overflow-hidden px-2',
                    )}
                  >
                    <div className="flex flex-1 flex-col">
                      <Button
                        loading={isSubmitting}
                        className="bg-fuchsia-400 hover:bg-fuchsia-500 dark:bg-fuchsia-500 text-white"
                      >
                        <UserPlus />
                        {textEditing} Payment
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
