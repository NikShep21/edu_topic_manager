import type {
  StudentTopicsQueryParams,
  TeacherTopicsQueryParams,
  TopicsQueryParams,
} from "@/entities/topic";

import type { TopicsListRole, TopicsListState } from "./types";

export const buildTopicsQueryParams = (
  role: TopicsListRole,
  state: TopicsListState,
): TopicsQueryParams => {
  const normalizedSearch = state.search.trim();

  if (role === "student") {
    const params: StudentTopicsQueryParams = {
      page: state.page,
      page_size: state.pageSize,
    };

    if (normalizedSearch) {
      params.search = normalizedSearch;
    }

    if (state.status !== "all") {
      params.status = state.status;
    }

    if (state.teacher !== "all") {
      params.teacher = Number(state.teacher);
    }

    return params;
  }

  const params: TeacherTopicsQueryParams = {
    page: state.page,
    page_size: state.pageSize,
  };

  if (normalizedSearch) {
    params.search = normalizedSearch;
  }

  if (state.status !== "all") {
    params.status = state.status;
  }

  if (state.type !== "all") {
    params.type = state.type;
  }

  return params;
};
