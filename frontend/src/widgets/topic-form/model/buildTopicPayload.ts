import type {
  CreateTopicRequest,
  TopicFile,
  TopicStepRequest,
  UpdateTopicRequest,
} from "@/entities/topic";

import type { TopicFormValues } from "./topicFormSchema";

const isNewFile = (file: File | TopicFile): file is File => {
  return file instanceof File;
};

const mapStepsToRequest = (steps: TopicFormValues["steps"]): TopicStepRequest[] => {
  return steps.map((step, index) => ({
    order: index + 1,
    title: step.title,
  }));
};

export const buildCreateTopicPayload = (values: TopicFormValues): CreateTopicRequest => {
  const files = values.filesState.files.filter(isNewFile);

  return {
    title: values.title,
    description: values.description,
    type: values.type,
    steps: mapStepsToRequest(values.steps),
    files,
  };
};

export const buildUpdateTopicPayload = (values: TopicFormValues): UpdateTopicRequest => {
  const files = values.filesState.files.filter(isNewFile);

  return {
    title: values.title,
    description: values.description,
    steps: mapStepsToRequest(values.steps),
    files,
    delete_files_ids: values.filesState.deletedIds,
  };
};
