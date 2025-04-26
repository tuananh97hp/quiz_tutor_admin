'use client';

import { useState } from 'react';
import { CalendarEvent, Mode } from '@/components/ui/calendar/calendar-types';
import Calendar from '@/components/ui/calendar/calendar';

export type CalendarViewComponentProps = {
  eventData: CalendarEvent[];
  documentRootPath: string;
};

export const CalendarPageViewComponent = ({
  eventData,
  documentRootPath,
}: CalendarViewComponentProps) => {
  const [events, setEvents] = useState<CalendarEvent[]>(eventData ?? []);
  const [mode, setMode] = useState<Mode>('month');
  const [date, setDate] = useState<Date>(new Date());
  return (
    <div className="mx-auto -mt-4 w-full max-w-screen-2xl px-4 md:px-8">
      <Calendar
        events={events}
        setEvents={setEvents}
        mode={mode}
        setMode={setMode}
        date={date}
        setDate={setDate}
      />
    </div>
  );
};
