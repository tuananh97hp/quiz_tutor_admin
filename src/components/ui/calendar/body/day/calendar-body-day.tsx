import { useCalendarContext } from '@/components/ui/calendar/calendar-context';
import CalendarBodyMarginDayMargin from '@/components/ui/calendar/body/day/calendar-body-margin-day-margin';
import CalendarBodyDayContent from '@/components/ui/calendar/body/day/calendar-body-day-content';
import CalendarBodyDayCalendar from '@/components/ui/calendar/body/day/calendar-body-day-calendar';
import CalendarBodyDayEvents from '@/components/ui/calendar/body/day/calendar-body-day-events';

export default function CalendarBodyDay() {
  const { date } = useCalendarContext();
  return (
    <div className="flex divide-x flex-grow overflow-hidden">
      <div className="flex flex-col flex-grow divide-y overflow-hidden">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="relative flex flex-1 divide-x">
            <CalendarBodyMarginDayMargin />
            <CalendarBodyDayContent date={date} />
          </div>
        </div>
      </div>
      <div className="lg:flex hidden flex-col flex-grow divide-y max-w-[276px]">
        <CalendarBodyDayCalendar />
        <CalendarBodyDayEvents />
      </div>
    </div>
  );
}
