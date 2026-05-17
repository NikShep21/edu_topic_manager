import { authClient } from "@/shared/api";

import { getRejectTopicEndpoint } from "./constants";

interface RejectTopicResponse {
  text: string;
}

export const rejectTopic = async (topicId: number): Promise<RejectTopicResponse> => {
  return authClient.post<RejectTopicResponse>(getRejectTopicEndpoint(topicId));
};
