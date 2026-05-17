import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getTopics } from "@/entities/topic/api/getTopics";
import type { TopicsQueryParams } from "@/entities/topic/api/types";
import { topicQueryKeys } from "@/entities/topic/model/queryKeys";
import type { Topic } from "@/entities/topic/model/types";
import type { PaginatedResponse } from "@/shared/lib/api/types";

export const useTopicsQuery = (query?: TopicsQueryParams) => {
  return useQuery<PaginatedResponse<Topic>>({
    queryKey: topicQueryKeys.list(query),
    queryFn: () => getTopics(query),
    placeholderData: keepPreviousData,
  });
};
