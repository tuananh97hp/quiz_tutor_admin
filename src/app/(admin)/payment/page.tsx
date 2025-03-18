import { Metadata } from 'next';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import { InputSearch } from '@/components/shared/input-search';
import { PaymentDataTable } from '@/components/(admin)/payment/payment-data-table';
import { EmptyPaymentState } from '@/components/(admin)/payment/empty-payment-state';
import { getCurrentAccessToken } from '@/utils/session';
import PaymentService from '@/services/PaymentService';

export const metadata: Metadata = {
  title: 'Payment Page',
};

interface ISearchParams {
  search?: string;
}

interface IPaymentPageProps {
  searchParams: ISearchParams;
}

const PaymentPage = async ({ searchParams = {} }: IPaymentPageProps) => {
  const { search = '' } = searchParams;
  const accessToken = await getCurrentAccessToken();

  let result;
  if (accessToken) {
    result = await PaymentService.getListPayment(accessToken, { search });
  }

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
      <div className="mt-12 flex flex-wrap items-center justify-between gap-x-4 gap-y-8">
        <div className="flex flex-row items-center">
          <Avatar className="dark:border-border mr-3 h-12 w-12 border-2 border-solid border-white">
            <AvatarFallback className="text-xs text-gray-400">CL</AvatarFallback>
          </Avatar>

          <h1 className="text-4xl font-semibold">Payment List</h1>
        </div>
        <Button>
          <CirclePlus /> Create Payment
        </Button>
        <div className="flex w-full flex-col gap-4 overflow-hidden p-1">
          <div className="-m-1 flex flex-wrap gap-x-4 gap-y-6 overflow-hidden p-1">
            <div className="-m-1 flex w-full flex-wrap gap-2 p-1">
              <div className="flex-grow basis-64">
                <InputSearch initialValue={searchParams.search || ''} label="paymentes" />
              </div>
              <div className="flex-grow basis-64" />
              <div className="flex-grow basis-64" />
              <div className="flex-grow basis-64" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {result?.data.length ? <PaymentDataTable results={result} /> : <EmptyPaymentState />}
      </div>
    </div>
  );
};

export default PaymentPage;
