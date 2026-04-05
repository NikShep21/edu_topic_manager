import type { StudentsQueryParams } from "@/entities/user/student";
import type { StudentSortField, SortDirection, StudentsManagementState } from "./types";

const SORT_FIELD_TO_ORDERING_MAP: Record<StudentSortField, string> = {
  full_name: "full_name",
  group: "group",
  course: "course",
};

const buildOrdering = (
  sortField: StudentSortField,
  sortDirection: SortDirection,
): string => {
  const orderingField = SORT_FIELD_TO_ORDERING_MAP[sortField];

  return sortDirection === "desc" ? `-${orderingField}` : orderingField;
};

export const buildStudentsQueryParams = (
  state: StudentsManagementState,
): StudentsQueryParams => {
  const params: StudentsQueryParams = {
    page: state.page,
    page_size: state.pageSize,
    ordering: buildOrdering(state.sortField, state.sortDirection),
  };

  const normalizedSearch = state.search.trim();

  if (normalizedSearch) {
    params.search = normalizedSearch;
  }

  if (state.group !== "all") {
    params.group = state.group;
  }

  if (state.course !== "all") {
    params.course = Number(state.course);
  }

  return params;
};
