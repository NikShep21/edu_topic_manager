export type StudentSortField = "full_name" | "group" | "course";
export type SortDirection = "asc" | "desc";

export interface StudentsManagementState {
  search: string;
  group: string;
  course: string;
  sortField: StudentSortField;
  sortDirection: SortDirection;
  page: number;
  pageSize: number;
}
