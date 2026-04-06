import type { SortDirection } from "@/shared/model/sort/types";

export type StudentSortField = "full_name" | "group" | "course";

export interface StudentsManagementState {
  search: string;
  group: string;
  course: string;
  sortField: StudentSortField;
  sortDirection: SortDirection;
  page: number;
  pageSize: number;
}
