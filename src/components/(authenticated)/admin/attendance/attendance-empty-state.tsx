import { UserRoundX, UserRoundCheck, Users } from 'lucide-react';
import { match } from 'ts-pattern';
import { ATTENDANCE_STATUS, TAttendanceStatus } from '@/utils/constants';

export type EmptyDocumentProps = { status: TAttendanceStatus };

export const AttendanceEmptyState = ({ status }: EmptyDocumentProps) => {
  const {
    title,
    message,
    icon: Icon,
  } = match(status)
    .with(ATTENDANCE_STATUS.ABSENT, () => ({
      title: `Không có buổi vắng`,
      message: `Hiện tại chưa có buổi vắng mặt nào. Khi có buổi vắng mặt, thông tin sẽ được hiển thị tại đây.`,
      icon: UserRoundX,
    }))
    .with(ATTENDANCE_STATUS.PRESENT, () => ({
      title: `Không có buổi đi học`,
      message: `Hiện tại chưa có sự tham dự buổi học nào. Khi có sự tham dự, thông tin sẽ được hiển thị tại đây.`,
      icon: UserRoundCheck,
    }))
    .otherwise(() => ({
      title: `Tất cả sạch sẻ`,
      message: `Chưa có thông tin đi học hoặc vắng. Khi có buổi vắng hoặc đi học, thông tin sẽ được hiển thị tại đây.`,
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
