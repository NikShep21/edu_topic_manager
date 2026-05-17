import type { QueryParams } from "@/shared/api";
import type { FilterOption } from "@/shared/lib/api/types";

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

export interface StudentsFilterFields {
  groups: FilterOption<number>[];
  courses: FilterOption<number>[];
}

export interface createStudentRequest {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  group: string;
  course: number;
  role: "student";
}
export interface UpdateStudentRequest {
  username?: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  group?: string;
  course?: number;
}
