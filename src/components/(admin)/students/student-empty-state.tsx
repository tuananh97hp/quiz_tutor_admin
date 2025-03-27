import { Loader, UserRoundCheck, UserRoundX, Users } from 'lucide-react';
import { match } from 'ts-pattern';
import { STUDENT_STATUS, TStudentStatus } from '@/utils/constants';

export type EmptyDocumentProps = { status: TStudentStatus };

export const StudentEmptyState = ({ status }: EmptyDocumentProps) => {
  const {
    title,
    message,
    icon: Icon,
  } = match(status)
    .with(STUDENT_STATUS.PROCESSING, () => ({
      title: `No process students`,
      message: `There are no students currently in the recruitment process. Once a student begins their application, they will appear here.`,
      icon: Loader,
    }))
    .with(STUDENT_STATUS.ACTIVE, () => ({
      title: `No active available`,
      message: `There are no students who have completed their recruitment process. Once a student is processed, they will appear here.`,
      icon: UserRoundCheck,
    }))
    .with(STUDENT_STATUS.INACTIVE, () => ({
      title: `No inactive available`,
      message: `There are no inactive students at the moment. Any student who is no longer active will be listed here.`,
      icon: UserRoundX,
    }))
    .otherwise(() => ({
      title: `All clear`,
      message: `All students are accounted for. Await new students to see them listed here.`,
      icon: Users,
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
