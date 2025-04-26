import { Loader, UserRoundCheck, UserRoundX, Users } from 'lucide-react';
import { match } from 'ts-pattern';
import { TEACHER_STATUS, TTeacherStatus } from '@/utils/constants';

export type EmptyDocumentProps = { status: TTeacherStatus };

export const TeacherEmptyState = ({ status }: EmptyDocumentProps) => {
  const {
    title,
    message,
    icon: Icon,
  } = match(status)
    .with(TEACHER_STATUS.PROCESSING, () => ({
      title: `Không có giáo viên chờ xử lý`,
      message: `Hiện tại không có giáo viên nào trong quá trình chờ xử lý. Khi giáo viên bắt đầu nộp đơn, họ sẽ xuất hiện ở đây.`,
      icon: Loader,
    }))
    .with(TEACHER_STATUS.ACTIVE, () => ({
      title: `Không có giáo viên đang hoạt động`,
      message: `Không có giáo viên nào đã hoàn tất quá trình tuyển dụng. Sau khi giáo viên được xử lý, họ sẽ xuất hiện ở đây.`,
      icon: UserRoundCheck,
    }))
    .with(TEACHER_STATUS.INACTIVE, () => ({
      title: `Không có giáo viên đã dừng`,
      message: `Hiện tại không có giáo viên nào đã dừng. Bất kỳ giáo viên nào không còn hoạt động sẽ được liệt kê ở đây.`,
      icon: UserRoundX,
    }))
    .otherwise(() => ({
      title: `Tất cả sạch sẻ,`,
      message: `Đã có đủ giáo viên. Chờ giáo viên mới thấy danh sách ở đây.`,
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
