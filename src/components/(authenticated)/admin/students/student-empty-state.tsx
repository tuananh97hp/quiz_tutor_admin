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
      title: `Không có học sinh chờ xử lý`,
      message: `Hiện tại không có học sinh nào trong quá trình chờ xử lý. Khi học sinh bắt đầu nộp đơn, họ sẽ xuất hiện ở đây.`,
      icon: Loader,
    }))
    .with(STUDENT_STATUS.ACTIVE, () => ({
      title: `Không có học sinh đang hoạt động`,
      message: `Không có học sinh nào đã hoàn tất quá trình tuyển dụng. Sau khi học sinh được xử lý, họ sẽ xuất hiện ở đây.`,
      icon: UserRoundCheck,
    }))
    .with(STUDENT_STATUS.INACTIVE, () => ({
      title: `Không có học sinh đã dừng`,
      message: `Hiện tại không có học sinh nào đã dừng. Bất kỳ học sinh nào không còn hoạt động sẽ được liệt kê ở đây.`,
      icon: UserRoundX,
    }))
    .otherwise(() => ({
      title: `Tất cả sạch sẻ,`,
      message: `Đã có đủ học sinh. Chờ học sinh mới thấy danh sách ở đây.`,
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
