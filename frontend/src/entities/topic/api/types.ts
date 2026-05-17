import type { FilterOption } from "@/shared/lib/api/types";
import type {
  Topic,
  TopicApplicationStatus,
  TopicStatus,
  TopicType,
} from "../model/types";
import type { QueryParams } from "@/shared/api";

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

export interface StudentTopicsFilterOptions {
  statuses: FilterOption<TopicStatus>[];
  teachers: FilterOption<number>[];
}

export interface TeacherTopicsFilterOptions {
  statuses: FilterOption<TopicStatus>[];
  types: FilterOption<TopicType>[];
}
export interface StudentTopicsQueryParams extends QueryParams {
  status?: TopicStatus;
  teacher?: number;
  search?: string;
}
export interface TeacherTopicsQueryParams extends QueryParams {
  status?: TopicStatus;
  type?: TopicType;
  search?: string;
}
export type TopicsQueryParams = StudentTopicsQueryParams | TeacherTopicsQueryParams;

export type TopicsFilterOptions = StudentTopicsFilterOptions | TeacherTopicsFilterOptions;

export interface MyTopicResponse {
  applicationStatus: TopicApplicationStatus | null;
  topic: Topic | null;
}
