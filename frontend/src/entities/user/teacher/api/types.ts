import type { QueryParams } from "@/shared/api";
import type { FilterOption } from "@/shared/lib/api/types";

export type OrderingTeacherBaseField =
  | "fio"
  | "academic_degree"
  | "academic_title"
  | "job_title";

export type OrderingTeacherField =
  | OrderingTeacherBaseField
  | `-${OrderingTeacherBaseField}`;

export interface TeachersQueryParams extends QueryParams {
  search?: string;
  academic_degree?: string;
  academic_title?: string;
  job_title?: string;
  ordering?: OrderingTeacherField;
  page: number;
  page_size: number;
}

export interface TeachersFilterFields {
  academic_degrees: FilterOption[];
  academic_titles: FilterOption[];
  job_titles: FilterOption[];
}
