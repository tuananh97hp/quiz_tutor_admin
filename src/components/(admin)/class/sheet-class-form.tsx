'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { BookPlus, CirclePlus, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import _ from 'lodash';
import { IClass } from '@/types/models';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { HTTP_CODE } from '@/utils/constants/http';
import { setErrorResponse } from '@/utils/handle';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ClassService from '@/services/ClassService';
import { InputDatePicker } from '@/components/ui/input-date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DAY_OF_WEEK } from '@/utils/constants/date';
import { DialogProps } from '@radix-ui/react-dialog';

const formSchema = z.object({
  name: z.string(),
  start_date: z.string().nonempty(),
  fee: z.preprocess((value) => Number(value), z.number().min(10)),
  schedules: z.array(
    z.object({
      day_of_week: z.string().nonempty(),
      start_time: z.string().nonempty(),
      end_time: z.string().nonempty(),
    }),
  ),
});
const defaultValues = {
  schedules: [],
};

interface IClassFormProps extends DialogProps {
  hideTrigger?: boolean;
  classItem?: IClass;
}
export function SheetClassForm({
  classItem,
  open: isOpen = false,
  hideTrigger = false,
  onOpenChange,
}: IClassFormProps) {
  const { data: currentSession } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: classItem ? _.omitBy(classItem, _.isNil) : defaultValues,
  });

  const schedulesWatcher = form.watch('schedules');
  const isSubmitting = form.formState.isSubmitting;
  const isEditing = !!classItem;
  const textEditing = !!classItem ? 'Update' : 'Add New';
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleAddSchedule = () => {
    const schedules = form.getValues('schedules') || [];
    schedules.push({
      day_of_week: '0',
      start_time: '',
      end_time: '',
    });
    form.setValue('schedules', schedules);
  };
  const handleRemoveSchedule = (index: number) => {
    const schedules = form.getValues('schedules') || [];
    schedules.splice(index, 1);

    form.setValue('schedules', schedules);
  };
  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!currentSession?.accessToken) return;
    try {
      if (isEditing) {
        await ClassService.updateClass(currentSession?.accessToken, classItem.id, data);
      } else {
        await ClassService.createClass(currentSession?.accessToken, data);
      }
      onOpenChange && onOpenChange(false);
      setOpen(false);
      toast(`Successfully ${textEditing} Class`, { type: 'success' });
      router.refresh();
    } catch (e) {
      if (e instanceof AxiosError && e.status === HTTP_CODE.UNPROCESSABLE_ENTITY) {
        setErrorResponse(e, form.setError);
      }
      toast(`Failed to ${textEditing} Class`, { type: 'error' });
    }
  }

  const handleOpenChange = (value: boolean) => {
    onOpenChange && onOpenChange(value);
    setOpen(value);
    form.reset();
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      {!hideTrigger && (
        <SheetTrigger asChild>
          <Button>
            <BookPlus /> Create Class
          </Button>
        </SheetTrigger>
      )}
      <SheetContent className="md:max-w-xl sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Create New Class</SheetTitle>
          <SheetDescription>
            Fields marked with <span className="text-red-500">*</span> are required. Please fill
            them in before submitting.
          </SheetDescription>
        </SheetHeader>
        <div className="mb-4 mt-2">
          <hr className="border-border" />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Class Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Class name" {...field} />
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
                name="fee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Fee</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="fee" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-6 mb-4">
              <span className="flex text-foreground/50 text-xs font-bold">
                Schedules
                <button onClick={handleAddSchedule}>
                  <CirclePlus />
                </button>
              </span>
              <hr className="border-border" />
            </div>
            <div className="grid grid-cols-1 gap-2">
              {schedulesWatcher &&
                schedulesWatcher.map((schedule, index) => (
                  <div className="grid grid-cols-10 gap-4" key={index}>
                    <div className="col-span-3">
                      <FormField
                        control={form.control}
                        name={`schedules.${index}.start_time`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel required>Start Time</FormLabel>
                            <FormControl>
                              <Input className="w-auto" type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-3">
                      <FormField
                        control={form.control}
                        name={`schedules.${index}.end_time`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel required>End Time</FormLabel>
                            <FormControl>
                              <Input className="w-auto" type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-3">
                      <FormField
                        control={form.control}
                        name={`schedules.${index}.day_of_week`}
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel required>Day Of Week</FormLabel>
                            <FormControl>
                              <Select defaultValue={field.value} onValueChange={field.onChange}>
                                <SelectTrigger aria-invalid={fieldState.invalid}>
                                  <SelectValue placeholder="Select a day of week" />
                                </SelectTrigger>
                                <SelectContent>
                                  {DAY_OF_WEEK.map((day, indexDay) => (
                                    <SelectItem key={indexDay} value={'' + indexDay}>
                                      {day}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <Button
                        onClick={() => handleRemoveSchedule(index)}
                        size="sm"
                        variant="outline"
                        aria-label="Add"
                        className="mt-8"
                      >
                        <Trash />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>

            <div className="mb-4 mt-4">
              <hr className="border-border" />
            </div>
            <div className="w-full flex flex-col items-center">
              <p className="text-muted-foreground mt-2 mb-2 text-sm">
                Enter the necessary information such as name, start date, and other details to&nbsp;
                {textEditing} a class.
              </p>
              <Button
                type="submit"
                loading={isSubmitting}
                className="w-full bg-fuchsia-400 hover:bg-fuchsia-500 dark:bg-fuchsia-500 text-white"
              >
                <BookPlus /> {textEditing} Class
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
