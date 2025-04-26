// import { CalendarEventStage } from '.prisma/client';

export type CalendarProps = {
  events: CalendarEvent[];
  setEvents: (events: CalendarEvent[]) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  date: Date;
  setDate: (date: Date) => void;
  calendarIconIsToday?: boolean;
};

export type CalendarContextType = CalendarProps & {
  newEventDialogOpen: boolean;
  setNewEventDialogOpen: (open: boolean) => void;
  manageEventDialogOpen: boolean;
  setManageEventDialogOpen: (open: boolean) => void;
  selectedEvent: CalendarEvent | null;
  setSelectedEvent: (event: CalendarEvent | null) => void;
};

export type CalendarEvent = {
  id: string;
  title: string;
  color: string;
  status: string;
  start: Date;
  end: Date;
  location?: string;
  description?: string;
  // eventType: CalendarEventStage;
  applicantId?: string;
};

export const calendarModes = ['day', 'week', 'month'] as const;
export type Mode = (typeof calendarModes)[number];
