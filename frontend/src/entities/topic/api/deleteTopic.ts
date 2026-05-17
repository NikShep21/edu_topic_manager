import { authClient } from "@/shared/api";
import { getTopicEndpoint } from "./constants";
import type { Topic } from "@/entities/topic";

export const deleteTopic = (topicId: number): Promise<Topic> =>
  authClient.delete(getTopicEndpoint(topicId));
