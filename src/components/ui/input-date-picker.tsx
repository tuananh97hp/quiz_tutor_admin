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
   * @type string | undefined
   */
  value?: string;

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

  /**
   * The class name of the calendar trigger button.
   * @default undefined
   * @type string
   */
  onChangeDate?: (date: string) => void;
}

export function InputDatePicker({
  value,
  placeholder = 'Pick a date',
  triggerVariant = 'outline',
  triggerSize = 'default',
  triggerClassName,
  className,
  onChangeDate,
  ...props
}: DatePickerProps) {
  const date = React.useMemo(() => {
    const parsedDate = new Date(value || '');
    return Number.isNaN(parsedDate.getTime()) ? value : parsedDate;
  }, [value]);

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
              {
                'ring-2 !ring-red-500 transition-all': props['aria-invalid'],
              },
              triggerClassName,
            )}
          >
            {date ? (
              format(date, 'LLL dd, y')
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
            <CalendarIcon className="ml-auto size-4 text-gray-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-auto p-0', className)} {...props}>
          <Calendar
            mode="single"
            initialFocus
            onSelect={(newDate) => {
              onChangeDate && onChangeDate(newDate ? format(newDate, 'yyyy-MM-dd') : '');
            }}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
