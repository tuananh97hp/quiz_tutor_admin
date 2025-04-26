import { Plus } from 'lucide-react';
import { useCalendarContext } from '@/components/ui/calendar/calendar-context';
import { Button } from '@/components/ui/button';

export default function CalendarHeaderActionsAdd() {
  const { setNewEventDialogOpen } = useCalendarContext();
  return (
    <Button
      className="bg-primary text-background flex items-center gap-1"
      onClick={() => setNewEventDialogOpen(true)}
    >
      <Plus />
      Add Event
    </Button>
  );
}
