import type { TopicsQueryParams } from "../api/types";
import type { UserRole } from "@/entities/user";

export const topicQueryKeys = {
  all: ["topics"] as const,

  lists: () => [...topicQueryKeys.all, "list"] as const,
  list: (query?: TopicsQueryParams) => [...topicQueryKeys.lists(), query] as const,
  myTopic: () => [...topicQueryKeys.all, "my-topic"] as const,
  filterOptions: (role: UserRole) =>
    [...topicQueryKeys.all, "filter-options", role] as const,

  details: () => [...topicQueryKeys.all, "detail"] as const,
  detail: (topicId: number) => [...topicQueryKeys.details(), topicId] as const,
};
