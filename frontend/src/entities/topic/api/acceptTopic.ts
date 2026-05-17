import { authClient } from "@/shared/api";

import { getAcceptTopicEndpoint } from "./constants";

interface AcceptTopicResponse {
  text: string;
}

export const acceptTopic = async (topicId: number): Promise<AcceptTopicResponse> => {
  return authClient.post<AcceptTopicResponse>(getAcceptTopicEndpoint(topicId));
};
