import { CalendarPageViewComponent } from '@/components/(authenticated)/common/calendar/calendar-page-view';
import { CalendarEvent } from '@/components/ui/calendar/calendar-types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | Thời Khoá Biểu',
};

const StudentCalendarPage = () => {
  const formattedEvents: CalendarEvent[] = [];
  const documentRootPath = '/student/calendar';

  return (
    <CalendarPageViewComponent
      eventData={formattedEvents}
      documentRootPath={`${documentRootPath}`}
    />
  );
};

export default StudentCalendarPage;
