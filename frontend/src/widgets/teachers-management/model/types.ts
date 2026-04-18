import type { SortDirection } from "@/shared/model/sort/types";

export type TeacherSortField =
  | "full_name"
  | "academic_degree"
  | "academic_title"
  | "job_title";

export interface TeachersManagementState {
  search: string;
  academic_degree: string;
  academic_title: string;
  job_title: string;
  sortField: TeacherSortField;
  sortDirection: SortDirection;
  page: number;
  pageSize: number;
}
