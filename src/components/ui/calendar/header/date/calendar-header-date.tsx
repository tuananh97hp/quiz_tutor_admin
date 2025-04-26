import { format } from 'date-fns';
import { useCalendarContext } from '@/components/ui/calendar/calendar-context';
import CalendarHeaderDateIcon from '@/components/ui/calendar/header/date/calendar-header-date-icon';
import CalendarHeaderDateBadge from '@/components/ui/calendar/header/date/calendar-header-date-badge';
import CalendarHeaderDateChevrons from '@/components/ui/calendar/header/date/calendar-header-date-chevrons';

export default function CalendarHeaderDate() {
  const { date } = useCalendarContext();
  return (
    <div className="flex items-center gap-2">
      <CalendarHeaderDateIcon />
      <div>
        <div className="flex items-center gap-1">
          <p className="text-lg font-semibold">{format(date, 'MMMM yyyy')}</p>
          <CalendarHeaderDateBadge />
        </div>
        <CalendarHeaderDateChevrons />
      </div>
    </div>
  );
}
