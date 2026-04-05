import type { StudentsQueryParams } from "../api/types";

export const studentQueryKeys = {
  all: ["students"] as const,
  list: (query: StudentsQueryParams) => [...studentQueryKeys.all, query] as const,
};
