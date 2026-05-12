import { authClient } from "@/shared/api";

import { TOPICS_ENDPOINT } from "./constants";
import type { CreateTopicRequest } from "./types";
import { buildTopicFormData } from "@/entities/topic/api/buildTopicFormData";
import type { Topic } from "@/entities/topic/model/types";

export const createTopic = async (payload: CreateTopicRequest): Promise<Topic> => {
  const formData = buildTopicFormData(payload);
  return authClient.post<Topic>(TOPICS_ENDPOINT, formData);
};
