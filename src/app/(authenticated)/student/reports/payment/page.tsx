import React from 'react';
import { SettingsHeader } from '@/components/(authenticated)/common/sub-layout/header';
import { getCurrentAccessToken } from '@/utils/session';
import { DatePickerSearch } from '@/components/ui/date-picker-search';
import PaymentService from '@/services/PaymentService';
import { StudentReportPaymentDataTable } from '@/components/(authenticated)/student/reports/payment/payment-data-table';
import { PaymentEmptyState } from '@/components/(authenticated)/admin/payment/payment-empty-state';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Học Sinh | Danh Sách Đóng Tiền',
};

interface ISearchParams {
  start_date?: string;
  end_date?: string;
  page?: string;
  perPage?: string;
}

interface IPageProps {
  searchParams: ISearchParams;
}

const StudentReportsPaymentPage = async ({ searchParams }: IPageProps) => {
  const { start_date = '', end_date = '', perPage = '10', page = '1' } = searchParams;
  const accessToken = await getCurrentAccessToken();

  let result;
  if (accessToken) {
    result = await PaymentService.studentMeGetPayment(accessToken, {
      start_date,
      end_date,
      page,
      per_page: perPage,
    });
  }
  return (
    <div>
      <SettingsHeader
        title="Đóng Tiền"
        subtitle="Tại đây bạn có thể xem thông tin đóng tiền của mình trước đó."
      />
      <div className="mx-auto w-full max-w-screen-2xl">
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-8">
          <div className="flex w-full flex-col gap-4 overflow-hidden p-1">
            <div className="-m-1 flex justify-between gap-x-4 gap-y-6 overflow-hidden p-1">
              <div />
              <div className="flex gap-3">
                <DatePickerSearch />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          {result?.data.length ? (
            <StudentReportPaymentDataTable results={result} />
          ) : (
            <PaymentEmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentReportsPaymentPage;
