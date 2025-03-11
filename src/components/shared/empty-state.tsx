import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ClipboardCheck, UserPlus, Users } from 'lucide-react';
import { match } from 'ts-pattern';

import { ExtendedDocumentStatus } from '@tda-recruitment/prisma/types/extended-document-status';

export type EmptyDocumentProps = { status: ExtendedDocumentStatus };

export const EmptyDocumentState = ({ status }: EmptyDocumentProps) => {
  const { _ } = useLingui();

  const {
    title,
    message,
    icon: Icon,
  } = match(status)
    .with(ExtendedDocumentStatus.COMPLETED, () => ({
      title: msg`No processed candidates`,
      message: msg`There are no candidates who have completed their recruitment process. Once a candidate is processed, they will appear here.`,
      icon: ClipboardCheck,
    }))
    .with(ExtendedDocumentStatus.DRAFT, () => ({
      title: msg`No drafts available`,
      message: msg`You currently have no candidate drafts. Start by adding a candidate to draft their profile or details.`,
      icon: UserPlus,
    }))
    .with(ExtendedDocumentStatus.ALL, () => ({
      title: msg`No candidates yet`,
      message: msg`You haven't added or received any candidates yet. Use the platform to add candidates or track incoming profiles.`,
      icon: Users,
    }))
    .otherwise(() => ({
      title: msg`All clear`,
      message: msg`All candidates are accounted for. Await new candidates to see them listed here.`,
      icon: ClipboardCheck,
    }));

  return (
    <div
      className="text-muted-foreground/60 flex h-60 flex-col items-center justify-center gap-y-4"
      data-testid="empty-document-state"
    >
      <Icon className="h-12 w-12" strokeWidth={1.5} />

      <div className="text-center">
        <h3 className="text-lg font-semibold">{_(title)}</h3>

        <p className="mt-2 max-w-[60ch]">{_(message)}</p>
      </div>
    </div>
  );
};
