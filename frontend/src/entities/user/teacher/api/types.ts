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
  academic_degrees: FilterOption<number>[];
  academic_titles: FilterOption<number>[];
  job_titles: FilterOption<number>[];
}

export interface CreateTeacherRequest {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  academic_degree: string;
  academic_title: string;
  job_title: string;
  role: "teacher";
}

export interface UpdateTeacherRequest {
  username?: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  academic_degree?: string;
  academic_title?: string;
  job_title?: string;
}
