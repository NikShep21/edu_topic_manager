export const topicQueryKeys = {
  all: ["topics"] as const,
  lists: () => [...topicQueryKeys.all, "list"] as const,
  details: () => [...topicQueryKeys.all, "detail"] as const,
  detail: (topicId: number) => [...topicQueryKeys.details(), topicId] as const,
};
