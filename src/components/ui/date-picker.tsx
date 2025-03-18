'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import type { ButtonProps } from './button';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { cn } from '@/lib/utils';

interface DatePickerProps extends React.ComponentPropsWithoutRef<typeof PopoverContent> {
  /**
   * The selected date.
   * @default undefined
   * @type Date | undefined
   */
  defaultDate?: Date;

  /**
   * The placeholder text of the calendar trigger button.
   * @default "Pick a date"
   * @type string | undefined
   */
  placeholder?: string;

  /**
   * The variant of the calendar trigger button.
   * @default "outline"
   * @type "default" | "outline" | "secondary" | "ghost"
   */
  triggerVariant?: Exclude<ButtonProps['variant'], 'destructive' | 'link'>;

  /**
   * The size of the calendar trigger button.
   * @default "default"
   * @type "default" | "sm" | "lg"
   */
  triggerSize?: Exclude<ButtonProps['size'], 'icon'>;

  /**
   * The class name of the calendar trigger button.
   * @default undefined
   * @type string
   */
  triggerClassName?: string;
}

const parseAsStringWithDefault = (value: string | null, defaultValue = '') => {
  return typeof value === 'string' && value.trim() !== '' ? value : defaultValue;
};

type DateParams = {
  date: string;
};

type UseDateParamsReturn = [DateParams, (newParams: Partial<DateParams>) => void];

type UseDateParams = (defaultDate?: Date) => UseDateParamsReturn;

const useDateParams: UseDateParams = (defaultDate) => {
  const [dateParams, setDateParams] = useState<DateParams>({
    date: parseAsStringWithDefault(defaultDate?.toISOString() ?? '', ''),
  });

  const updateDateParams = (newParams: Partial<DateParams>) => {
    setDateParams((prevParams) => {
      const updatedParams = {
        ...prevParams,
        ...newParams,
      };

      const queryString = new URLSearchParams(window.location.search);
      if (updatedParams.date) {
        queryString.set('date', format(new Date(updatedParams.date), 'yyyy-MM-dd'));
      } else {
        queryString.delete('date');
      }
      window.history.replaceState(null, '', `?${queryString.toString()}`);

      return updatedParams;
    });
  };

  useEffect(() => {
    const queryString = new URLSearchParams(window.location.search);
    const date = queryString.get('date');
    setDateParams({
      date: parseAsStringWithDefault(date, dateParams.date),
    });
  }, []);

  return [dateParams, updateDateParams];
};

export function DatePicker({
  defaultDate,
  placeholder = 'Pick a date',
  triggerVariant = 'outline',
  triggerSize = 'default',
  triggerClassName,
  className,
  ...props
}: DatePickerProps) {
  const [dateParams, setDateParams] = useDateParams(defaultDate);

  const date = React.useMemo(() => {
    if (!dateParams.date) return defaultDate;
    const parsedDate = new Date(dateParams.date);
    return Number.isNaN(parsedDate.getTime()) ? defaultDate : parsedDate;
  }, [dateParams, defaultDate]);

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={triggerVariant}
            size={triggerSize}
            className={cn(
              'w-full justify-start gap-2 truncate text-left font-normal',
              !date && 'text-muted-foreground',
              triggerClassName,
            )}
          >
            <CalendarIcon className="ml-1 size-4 text-gray-500" />
            {date ? (
              format(date, 'LLL dd, y')
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-auto p-0', className)} {...props}>
          <Calendar
            mode="single"
            initialFocus
            defaultMonth={date}
            selected={date}
            onSelect={(newDate) => {
              void setDateParams({ date: newDate?.toISOString() ?? '' });
            }}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
