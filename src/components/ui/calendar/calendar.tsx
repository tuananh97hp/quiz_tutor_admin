import CalendarProvider from '@/components/ui/calendar/calendar-provider';
import { CalendarProps } from '@/components/ui/calendar/calendar-types';
import CalendarHeader from '@/components/ui/calendar/header/calendar-header';
import CalendarHeaderDate from '@/components/ui/calendar/header/date/calendar-header-date';
import CalendarHeaderActions from '@/components/ui/calendar/header/actions/calendar-header-actions';
import CalendarHeaderActionsMode from '@/components/ui/calendar/header/actions/calendar-header-actions-mode';
import CalendarBody from '@/components/ui/calendar/body/calendar-body';

export default function Calendar({
  events,
  setEvents,
  mode,
  setMode,
  date,
  setDate,
  calendarIconIsToday = true,
}: CalendarProps) {
  return (
    <CalendarProvider
      events={events}
      setEvents={setEvents}
      mode={mode}
      setMode={setMode}
      date={date}
      setDate={setDate}
      calendarIconIsToday={calendarIconIsToday}
    >
      <CalendarHeader>
        <CalendarHeaderDate />
        <CalendarHeaderActions>
          <CalendarHeaderActionsMode />
          {/*<CalendarHeaderActionsAdd />*/}
        </CalendarHeaderActions>
      </CalendarHeader>
      <CalendarBody />
    </CalendarProvider>
  );
}
