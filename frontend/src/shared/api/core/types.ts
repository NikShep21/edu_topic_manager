export type QueryValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryValue>;

export type RequestOptions = Omit<RequestInit, "body"> & {
  query?: QueryParams;
  body?: unknown;
};
