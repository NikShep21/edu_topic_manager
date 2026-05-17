import { authClient } from "@/shared/api";

import { getApplyTopicEndpoint } from "./constants";

interface ApplyTopicResponse {
  text: string;
}

export const applyTopic = async (topicId: number): Promise<ApplyTopicResponse> => {
  return authClient.post<ApplyTopicResponse>(getApplyTopicEndpoint(topicId));
};
