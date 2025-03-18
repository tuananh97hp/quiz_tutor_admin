'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';

import type { ButtonProps } from './button';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { cn } from '@/lib/utils';

interface DateRangePickerProps extends React.ComponentPropsWithoutRef<typeof PopoverContent> {
  /**
   * The selected date range.
   * @default undefined
   * @type DateRange
   * @example { from: new Date(), to: new Date() }
   */
  defaultDateRange?: DateRange;

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
   * Controls whether query states are updated client-side only (default: true).
   * Setting to `false` triggers a network request to update the querystring.
   * @default true
   */
  shallow?: boolean;
}

const parseAsStringWithDefault = (value: string | null, defaultValue = '') => {
  return typeof value === 'string' && value.trim() !== '' ? value : defaultValue;
};

type DateParams = {
  from: string;
  to: string;
};

type UseDateParamsReturn = [DateParams, (newParams: Partial<DateParams>) => void];

type DefaultDateRange = {
  from?: Date;
  to?: Date;
};

type UseDateParams = (
  defaultDateRange?: DefaultDateRange,
  shallow?: boolean,
) => UseDateParamsReturn;

const useDateParams: UseDateParams = (defaultDateRange, shallow = true) => {
  // Initialize states for `from` and `to`
  const [dateParams, setDateParams] = useState<DateParams>({
    from: parseAsStringWithDefault(defaultDateRange?.from?.toISOString() ?? '', ''),
    to: parseAsStringWithDefault(defaultDateRange?.to?.toISOString() ?? '', ''),
  });

  // Function to update `from` or `to` values
  const updateDateParams = (newParams: Partial<DateParams>) => {
    setDateParams((prevParams) => {
      const updatedParams = {
        ...prevParams,
        ...newParams,
      };

      // Update the URL search params
      const queryString = new URLSearchParams(window.location.search);
      if (updatedParams.from) {
        queryString.set('from', format(new Date(updatedParams.from), 'yyyy-MM-dd'));
      } else {
        queryString.delete('from');
      }

      if (updatedParams.to) {
        queryString.set('to', format(new Date(updatedParams.to), 'yyyy-MM-dd'));
      } else {
        queryString.delete('to');
      }

      window.history.replaceState(null, '', `?${queryString.toString()}`);

      return updatedParams;
    });
  };

  // Example: syncing with query string (if needed)
  useEffect(() => {
    if (shallow) {
      const queryString = new URLSearchParams(window.location.search);

      const from = queryString.get('from');
      const to = queryString.get('to');

      setDateParams({
        from: parseAsStringWithDefault(from, dateParams.from),
        to: parseAsStringWithDefault(to, dateParams.to),
      });
    }
  }, [shallow]);

  return [dateParams, updateDateParams];
};

export function DateRangePicker({
  defaultDateRange,
  placeholder = 'Pick a date',
  triggerVariant = 'outline',
  triggerSize = 'default',
  triggerClassName,
  shallow = true,
  className,
  ...props
}: DateRangePickerProps) {
  const [dateParams, setDateParams] = useDateParams(defaultDateRange);

  const date = React.useMemo(() => {
    function parseDate(dateString: string | null) {
      if (!dateString) return undefined;
      const parsedDate = new Date(dateString);
      return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
    }

    return {
      from: parseDate(dateParams.from) ?? defaultDateRange?.from,
      to: parseDate(dateParams.to) ?? defaultDateRange?.to,
    };
  }, [dateParams, defaultDateRange]);

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
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-auto p-0', className)} {...props}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(newDateRange) => {
              void setDateParams({
                from: newDateRange?.from?.toISOString() ?? '',
                to: newDateRange?.to?.toISOString() ?? '',
              });
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
