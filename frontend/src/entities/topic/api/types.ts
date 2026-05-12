import type { TopicType } from "../model/types";

export interface TopicStepRequest {
  order: number;
  title: string;
}

export interface CreateTopicRequest {
  title: string;
  description: string;
  type: TopicType;
  steps?: TopicStepRequest[];
  files?: File[];
}

export interface UpdateTopicRequest {
  title?: string;
  description?: string;
  steps?: TopicStepRequest[];
  files?: File[];
  delete_files_ids?: number[];
}
