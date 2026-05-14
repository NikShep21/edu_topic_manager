import type { Topic } from "@/entities/topic";

export type TopicFormMode = "create" | "edit";

interface BaseTopicFormProps {
  onCancel: () => void;
  onSuccess?: (topic: Topic, action: TopicFormMode) => void;
}

interface CreateTopicFormProps extends BaseTopicFormProps {
  mode?: "create";
  initialData?: never;
  onDeleteSuccess?: never;
}

interface EditTopicFormProps extends BaseTopicFormProps {
  mode: "edit";
  initialData: Topic;
  onDeleteSuccess?: () => void;
}

export type TopicFormProps = CreateTopicFormProps | EditTopicFormProps;
