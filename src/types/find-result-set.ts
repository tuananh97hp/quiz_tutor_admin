export type FindResultSet<T> = {
  data: T extends Array<unknown> ? T : T[];
  meta: {
    count: number;
    last_page: number;
    current_page: number;
    per_page: number;
    total: number;
  };
};
