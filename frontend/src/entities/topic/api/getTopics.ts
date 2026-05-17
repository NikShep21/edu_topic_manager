import { authClient } from "@/shared/api";

import type { Topic } from "@/entities/topic";
import { TOPICS_ENDPOINT } from "@/entities/topic/api/constants";
import type { TopicsQueryParams } from "@/entities/topic/api/types";
import type { PaginatedResponse } from "@/shared/lib/api/types";

export const getTopics = async (
  query?: TopicsQueryParams,
): Promise<PaginatedResponse<Topic>> => {
  return authClient.get<PaginatedResponse<Topic>>(TOPICS_ENDPOINT, {
    query,
  });
};
