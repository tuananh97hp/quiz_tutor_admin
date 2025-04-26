import { CircleX, BookCheck, LayoutGrid } from 'lucide-react';
import { match } from 'ts-pattern';
import { CLASS_STATUS, TClassStatus } from '@/utils/constants';

export type EmptyDocumentProps = { status: TClassStatus };

export const ClassEmptyState = ({ status }: EmptyDocumentProps) => {
  const {
    title,
    message,
    icon: Icon,
  } = match(status)
    .with(CLASS_STATUS.OPEN, () => ({
      title: `Không có sẵn đang mở`,
      message: `Hiện tại không có lớp học nào mở. Các lớp học mới sẽ được liệt kê ở đây khi có lớp học.`,
      icon: BookCheck,
    }))
    .with(CLASS_STATUS.CLOSE, () => ({
      title: `Không có lớp học đóng`,
      message: `Hiện tại không có lớp học nào đóng cửa. Các lớp học đóng sẽ được liệt kê ở đây khi có lớp học.`,
      icon: CircleX,
    }))
    .otherwise(() => ({
      title: `Tấ́t cả sạch sẻ`,
      message: `Tất cả các lớp đã được dọn dẹp. Chờ các lớp mới để xem danh sách ở đây.`,
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
