import { authClient } from "@/shared/api";

import { getCancelTopicApplicationEndpoint } from "./constants";

interface CancelTopicApplicationResponse {
  text: string;
}

export const cancelTopicApplication = async (
  topicId: number,
): Promise<CancelTopicApplicationResponse> => {
  return authClient.post<CancelTopicApplicationResponse>(
    getCancelTopicApplicationEndpoint(topicId),
  );
};
