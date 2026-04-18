export interface PaginatedResponse<T> {
  count: number;
  results: T[];
}
export type FilterOption = {
  name: string;
  id: number;
};
