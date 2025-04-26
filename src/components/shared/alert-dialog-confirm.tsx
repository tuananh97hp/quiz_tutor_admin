'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface IAlertDialogConfirmProps {
  title: string;
  description: string;
  children: React.ReactNode;
  cancelLabel?: string;
  okLabel?: string;
  onOk?: () => Promise<void>;
  onCancel?: () => void;
}

const AlertDialogConfirm = ({
  title,
  description,
  children,
  cancelLabel,
  okLabel,
  onCancel,
  onOk,
}: IAlertDialogConfirmProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const handlerOpenChange = (val: boolean) => {
    if (val) {
      setIsOpen(val);
    }
  };

  const handlerCancel = () => {
    onCancel?.();
    setIsOpen(false);
  };

  const handlerOk = () => {
    startTransition(async () => {
      await onOk?.();
      setIsOpen(false);
    });
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={handlerOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handlerCancel}>{cancelLabel || 'Hủy'}</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button loading={isPending} onClick={handlerOk}>
              {okLabel || 'Xác nhận'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogConfirm;
