import { CircleX, BookCheck, LayoutGrid } from 'lucide-react';
import { match } from 'ts-pattern';
import { CLASS_STATUS, TClassStatus } from '@/utils/constants';

export type EmptyDocumentProps = { status: TClassStatus };

export const EmptyClassState = ({ status }: EmptyDocumentProps) => {
  const {
    title,
    message,
    icon: Icon,
  } = match(status)
    .with(CLASS_STATUS.OPEN, () => ({
      title: `No open available`,
      message: `Currently, there are no open classes. New classes will be listed here once they become available.`,
      icon: BookCheck,
    }))
    .with(CLASS_STATUS.CLOSE, () => ({
      title: `No close available`,
      message: `There are no closed classes at the moment.`,
      icon: CircleX,
    }))
    .otherwise(() => ({
      title: `All clear`,
      message: `All classes are accounted for. Await new classes to see them listed here.`,
      icon: LayoutGrid,
    }));

  return (
    <div
      className="text-muted-foreground/60 flex h-60 flex-col items-center justify-center gap-y-4"
      data-testid="empty-document-state"
    >
      <Icon className="h-12 w-12" strokeWidth={1.5} />

      <div className="text-center">
        <h3 className="text-lg font-semibold">{title}</h3>

        <p className="mt-2 max-w-[60ch]">{message}</p>
      </div>
    </div>
  );
};
