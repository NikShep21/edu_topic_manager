import type {
  StudentsQueryParams,
  OrderingStudentBaseField,
  OrderingStudentField,
} from "@/entities/user/student";
import type { StudentSortField, StudentsManagementState } from "./types";
import type { SortDirection } from "@/shared/model/sort/types";

const SORT_FIELD_TO_ORDERING_MAP: Record<StudentSortField, OrderingStudentBaseField> = {
  full_name: "fio",
  group: "group",
  course: "course",
};

const buildOrdering = (
  sortField: StudentSortField,
  sortDirection: SortDirection,
): OrderingStudentField => {
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
