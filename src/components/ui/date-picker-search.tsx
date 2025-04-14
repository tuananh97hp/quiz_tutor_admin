'use client';

import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import type { ButtonProps } from './button';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

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

export function DatePickerSearch({
  defaultDate,
  placeholder = 'Pick a date',
  triggerVariant = 'outline',
  triggerSize = 'default',
  triggerClassName,
  className,
  ...props
}: DatePickerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dateTerm, setDateTerm] = useState(defaultDate);

  const handleSearch = useCallback(
    (term?: Date) => {
      const params = new URLSearchParams(searchParams?.toString() ?? '');
      if (term) {
        params.set('date', format(term, 'yyyy-MM-dd'));
      } else {
        params.delete('date');
      }
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  useEffect(() => {
    handleSearch(dateTerm);
  }, [dateTerm, handleSearch]);

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={triggerVariant}
            size={triggerSize}
            className={cn(
              'w-full justify-start gap-2 truncate text-left font-normal',
              !dateTerm && 'text-muted-foreground',
              triggerClassName,
            )}
          >
            <CalendarIcon className="ml-1 size-4 text-gray-500" />
            {dateTerm ? (
              format(dateTerm, 'LLL dd, y')
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-auto p-0', className)} {...props}>
          <Calendar
            mode="single"
            initialFocus
            defaultMonth={dateTerm}
            selected={dateTerm}
            onSelect={(newDate) => {
              void setDateTerm(newDate);
            }}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
