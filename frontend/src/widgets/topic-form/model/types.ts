import type { Topic } from "@/entities/topic";

export type TopicFormMode = "create" | "edit";

export interface TopicFormProps {
  mode?: TopicFormMode;
  initialData?: Topic;
  onSuccess?: (topic: Topic) => void;
  onCancel?: () => void;
}
