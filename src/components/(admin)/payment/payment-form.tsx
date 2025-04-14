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
import React, { useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { InputDatePicker } from '@/components/ui/input-date-picker';
import PaymentService from '@/services/PaymentService';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { HTTP_CODE } from '@/utils/constants/http';
import { setErrorResponse } from '@/utils/handle';
import { IPayment, IStudent } from '@/types/models';
import _ from 'lodash';
import { SingleSelectCombobox } from '@/components/ui/single-select-combobox';
import { PaymentAttendanceAttendanceDataTable } from '@/components/(admin)/payment/payment-attendance-table';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import StudentService from '@/services/StudentService';

const formSchema = z.object({
  user_id: z.number(),
  money: z.preprocess((value) => Number(value), z.number().min(10)),
  desc: z.string(),
  payment_date: z.string().nonempty(),
  attendances: z.array(z.number()).min(1),
});

interface IPaymentFormProps {
  payment?: IPayment;
  student?: IStudent;
}

const defaultValues = (student?: IStudent) => {
  if (student) {
    return {
      user_id: student.id,
      payment_date: format(new Date(), 'yyyy-MM-dd'),
      attendances: [],
      desc: '',
    };
  }

  return {
    payment_date: format(new Date(), 'yyyy-MM-dd'),
    attendances: [],
    desc: '',
  };
};

export const PaymentForm = ({ payment, student }: IPaymentFormProps) => {
  const { data: currentSession } = useSession();
  const router = useRouter();
  const [students, setStudents] = React.useState<IStudent[]>([]);
  const [isLoadingStudents, startTransitionLoadingStudents] = React.useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: payment ? _.omitBy(payment, _.isNil) : defaultValues(student),
  });
  const isSubmitting = form.formState.isSubmitting;
  const isEditing = !!payment;
  const textEditing = !!payment ? 'Update' : 'Add New';

  useEffect(() => {
    handleChangeSearchUser('');
  }, [currentSession?.accessToken]);

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

  const handleChangeSearchUser = (value: string) => {
    startTransitionLoadingStudents(async () => {
      if (currentSession?.accessToken && !student) {
        try {
          const { data } = await StudentService.fetchDataStudent(currentSession?.accessToken, {
            search: value,
          });
          setStudents(data);
        } catch (e) {
          console.error(e);
        }
      }
    });
  };

  const handleChangeAttendanceSelected = (attendance_id: number) => {
    const attendances = form.getValues('attendances');
    if (attendances.includes(attendance_id)) {
      form.setValue(
        'attendances',
        attendances.filter((id) => id !== attendance_id),
      );
    } else {
      form.setValue('attendances', [...attendances, attendance_id]);
    }
  };

  const studentsOptions = useMemo(() => {
    return students.map((student) => ({
      value: student.id,
      label: `${student.first_name} ${student.last_name || ''}`,
    }));
  }, [students]);

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
                  <div>
                    {student ? (
                      <>
                        Add New a payment for:{' '}
                        <span className="font-semibold text-red-500">
                          {student.first_name} {student.last_name || ''}
                        </span>
                      </>
                    ) : (
                      <FormField
                        control={form.control}
                        name="user_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel required>Student Payment</FormLabel>
                            <FormControl>
                              <SingleSelectCombobox
                                selectedValue={field.value}
                                onChange={(value) => {
                                  field.onChange(value);
                                  form.setValue('attendances', []);
                                }}
                                onChangeSearch={handleChangeSearchUser}
                                emptySelectionPlaceholder="Select student for payment"
                                options={studentsOptions}
                                loadingSearch={isLoadingStudents}
                                enableClearAllButton={true}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                  <div className="mt-8">
                    <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 after:content-['*'] after:text-red-500 after:ml-0.5">
                      Attendance
                    </div>
                    <div className="mt-4">
                      <PaymentAttendanceAttendanceDataTable
                        student_id={form.watch('user_id')}
                        attendanceSelected={form.watch('attendances')}
                        onChangeAttSelected={handleChangeAttendanceSelected}
                      />
                    </div>
                    {form.formState.errors.attendances && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.attendances.message}
                      </p>
                    )}
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
                  <div className="grid grid-cols-1 gap-4 mb-8">
                    <FormField
                      control={form.control}
                      name="money"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>Money</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Money" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="payment_date"
                      render={({ field: { onChange, value }, fieldState }) => (
                        <FormItem>
                          <FormLabel required>Payment Date</FormLabel>
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
                    <div>
                      <FormField
                        control={form.control}
                        name="desc"
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
