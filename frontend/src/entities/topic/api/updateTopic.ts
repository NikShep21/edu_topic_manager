import { authClient } from "@/shared/api";

import { buildTopicFormData } from "./buildTopicFormData";
import { getTopicEndpoint } from "./constants";
import type { UpdateTopicRequest } from "./types";
import type { Topic } from "@/entities/topic";

type UpdateTopicParams = {
  topicId: number;
  payload: UpdateTopicRequest;
};

export const updateTopic = async ({
  topicId,
  payload,
}: UpdateTopicParams): Promise<Topic> => {
  const formData = buildTopicFormData(payload);
  return authClient.patch<Topic>(getTopicEndpoint(topicId), formData);
};
