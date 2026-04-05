import type { QueryParams } from "@/shared/api/core/types";

export interface StudentsQueryParams extends QueryParams {
  search?: string;
  group?: string;
  course?: number;
  ordering?: string;
  page: number;
  page_size: number;
}

export interface PaginatedResponse<T> {
  count: number;

  results: T[];
}
