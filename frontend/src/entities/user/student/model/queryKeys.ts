import type { StudentsQueryParams } from "../api/types";

export const studentQueryKeys = {
  all: ["students"] as const,
  lists: () => [...studentQueryKeys.all, "list"] as const,
  list: (query: StudentsQueryParams) => [...studentQueryKeys.lists(), query] as const,
  filterOptions: () => [...studentQueryKeys.all, "filter-options"] as const,
};
