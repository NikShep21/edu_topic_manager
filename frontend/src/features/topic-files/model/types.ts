import type { TopicFile } from "@/entities/topic";

export interface TopicFilesValue {
  files: Array<File | TopicFile>;
  deletedIds: number[];
}
