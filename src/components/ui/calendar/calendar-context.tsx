import { createContext, useContext } from 'react';
import { CalendarContextType } from '@/components/ui/calendar/calendar-types';

export const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendarContext must be used within a CalendarProvider');
  }
  return context;
}
