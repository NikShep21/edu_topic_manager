import type {
  OrderingTeacherBaseField,
  OrderingTeacherField,
  TeachersQueryParams,
} from "@/entities/user/teacher";
import type { SortDirection } from "@/shared/model/sort/types";
import type {
  TeachersManagementState,
  TeacherSortField,
} from "@/widgets/teachers-management/model/types";

const SORT_FIELD_TO_ORDERING_MAP: Record<TeacherSortField, OrderingTeacherBaseField> = {
  full_name: "fio",
  academic_degree: "academic_degree",
  academic_title: "academic_title",
  job_title: "job_title",
};

const buildOrdering = (
  sortField: TeacherSortField,
  sortDirection: SortDirection,
): OrderingTeacherField => {
  const orderingField = SORT_FIELD_TO_ORDERING_MAP[sortField];

  return sortDirection === "desc" ? `-${orderingField}` : orderingField;
};

export const buildTeachersQueryParams = (
  state: TeachersManagementState,
): TeachersQueryParams => {
  const params: TeachersQueryParams = {
    page: state.page,
    page_size: state.pageSize,
    ordering: buildOrdering(state.sortField, state.sortDirection),
  };

  const normalizedSearch = state.search.trim();

  if (normalizedSearch) {
    params.search = normalizedSearch;
  }

  if (state.academic_degree !== "all") {
    params.academic_degree = state.academic_degree;
  }

  if (state.academic_title !== "all") {
    params.academic_title = state.academic_title;
  }
  if (state.job_title !== "all") {
    params.job_title = state.job_title;
  }

  return params;
};
