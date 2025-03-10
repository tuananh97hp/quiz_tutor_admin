export const getParamHref = (urlPath: string, searchParams: any, key: string, value: string) => {
  const params = new URLSearchParams(searchParams);

  params.set(key, value);

  return `${urlPath}?${params.toString()}`;
};
