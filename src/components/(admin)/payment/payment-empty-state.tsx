import { HandCoins } from 'lucide-react';

export const PaymentEmptyState = () => {
  return (
    <div
      className="text-muted-foreground/60 flex h-60 flex-col items-center justify-center gap-y-4"
      data-testid="empty-document-state"
    >
      <HandCoins className="h-12 w-12" strokeWidth={1.5} />

      <div className="text-center">
        <h3 className="text-lg font-semibold">No available</h3>

        <p className="mt-2 max-w-[60ch]">Currently, there are no payments to display.</p>
      </div>
    </div>
  );
};
