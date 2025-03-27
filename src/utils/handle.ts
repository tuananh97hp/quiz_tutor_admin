import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';

export const getParamHref = (urlPath: string, searchParams: any, key: string, value: string) => {
  const params = new URLSearchParams(searchParams);

  params.set(key, value);

  return `${urlPath}?${params.toString()}`;
};

export const formatMoney = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { maximumSignificantDigits: 3 }).format(+value);
};

export const setErrorResponse = <T extends FieldValues = FieldValues>(
  e: any,
  setError: UseFormSetError<T>,
) => {
  const { data = {} } = e?.response || {};
  const { errors } = data;
  if (errors) {
    Object.keys(errors).forEach((key) => {
      setError(key as FieldPath<T>, {
        type: 'manual',
        message: errors[key][0],
      });
    });
  }
};
