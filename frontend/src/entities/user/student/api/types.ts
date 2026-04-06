import type { QueryParams } from "@/shared/api";

export type OrderingStudentBaseField = "fio" | "group" | "course";

export type OrderingStudentField =
  | OrderingStudentBaseField
  | `-${OrderingStudentBaseField}`;

export interface StudentsQueryParams extends QueryParams {
  search?: string;
  group?: string;
  course?: number;
  ordering?: OrderingStudentField;
  page: number;
  page_size: number;
}

export interface PaginatedResponse<T> {
  count: number;
  results: T[];
}
