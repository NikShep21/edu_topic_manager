export interface PaginatedResponse<T> {
  count: number;
  results: T[];
}
export type FilterOption<T extends string | number> = {
  name: string;
  id: T;
};
