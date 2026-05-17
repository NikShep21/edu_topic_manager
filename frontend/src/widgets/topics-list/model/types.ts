import type { TopicStatus, TopicType } from "@/entities/topic";

export type TopicsListRole = "student" | "teacher";

export interface TopicsListState {
  search: string;
  status: TopicStatus | "all";
  teacher: string;
  type: TopicType | "all";
  page: number;
  pageSize: number;
}
