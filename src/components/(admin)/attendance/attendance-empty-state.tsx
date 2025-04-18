import { CalendarCheck } from 'lucide-react';

export const AttendanceEmptyState = () => {
  return (
    <div
      className="text-muted-foreground/60 flex h-60 flex-col items-center justify-center gap-y-4"
      data-testid="empty-document-state"
    >
      <CalendarCheck className="h-12 w-12" strokeWidth={1.5} />

      <div className="text-center">
        <h3 className="text-lg font-semibold">No available</h3>

        <p className="mt-2 max-w-[60ch]">Currently, there are no classes to display.</p>
      </div>
    </div>
  );
};
