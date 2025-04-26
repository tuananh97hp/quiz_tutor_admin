'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { type DialogProps } from '@radix-ui/react-dialog';
import { IClass } from '@/types/models';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import ClassService from '@/services/ClassService';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { router } from 'next/client';
import { useRouter } from 'next/navigation';

interface IProps extends DialogProps {
  classItem: IClass;
}

export const ClassChangeStatus = ({ classItem, ...props }: IProps) => {
  const [status, setStatus] = React.useState<string>(classItem.status);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { data: currentSession } = useSession();
  const handleSave = async () => {
    try {
      setIsLoading(true);
      if (!currentSession?.accessToken) return;
      await ClassService.updateStatus(currentSession.accessToken, classItem.id, { status });
      toast('Successfully updated status', { type: 'success' });
      props.onOpenChange && props.onOpenChange(false);
      router.refresh();
    } catch (e) {
      toast('Failed to update status', { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog {...props}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thay đổi trạng thái lớp [{classItem.name}]</DialogTitle>
            <DialogDescription>
              Vui lòng chọn trạng thái mới bên dưới. Nhấp vào lưu khi bạn hoàn tất.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select defaultValue={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Hoạt động</SelectItem>
                <SelectItem value="close">Đã đóng</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => props.onOpenChange && props.onOpenChange(false)}
            >
              Huỷ
            </Button>
            <Button type="button" onClick={handleSave} loading={isLoading}>
              Lưu Thay Đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
