import type { TeachersQueryParams } from "@/entities/user/teacher/api/types";

export const teacherQueryKeys = {
  all: ["teachers"] as const,
  lists: () => [...teacherQueryKeys.all, "list"] as const,
  list: (query: TeachersQueryParams) => [...teacherQueryKeys.lists(), query] as const,
  filterOptions: () => [...teacherQueryKeys.all, "filter-options"] as const,
};
