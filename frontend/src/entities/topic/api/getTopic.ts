import { authClient } from "@/shared/api";
import { getTopicEndpoint } from "./constants";

import type { Topic } from "@/entities/topic";

export const getTopic = async (topicId: number | string): Promise<Topic> => {
  return authClient.get<Topic>(getTopicEndpoint(topicId));
};
