import { format } from 'date-fns';
import { useCalendarContext } from '@/components/ui/calendar/calendar-context';

export default function CalendarHeaderDateIcon() {
  const { calendarIconIsToday, date: calendarDate } = useCalendarContext();
  const date = calendarIconIsToday ? new Date() : calendarDate;
  return (
    <div className="flex w-14 h-14 flex-col items-start overflow-hidden rounded-lg border">
      <p className="bg-primary text-background flex h-6 w-full items-center justify-center text-center text-xs font-semibold uppercase">
        {format(date, 'MMM')}
      </p>
      <p className="flex w-full items-center justify-center text-lg font-bold">
        {format(date, 'dd')}
      </p>
    </div>
  );
}
