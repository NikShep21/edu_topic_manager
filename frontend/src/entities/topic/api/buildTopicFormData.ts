import type { CreateTopicRequest, UpdateTopicRequest } from "./types";

type TopicFormDataPayload = CreateTopicRequest | UpdateTopicRequest;

const appendIfDefined = (
  formData: FormData,
  key: string,
  value: string | Blob | undefined,
) => {
  if (value !== undefined) {
    formData.append(key, value);
  }
};

export const buildTopicFormData = (payload: TopicFormDataPayload) => {
  const formData = new FormData();

  appendIfDefined(formData, "title", payload.title);
  appendIfDefined(formData, "description", payload.description);

  if ("type" in payload) {
    appendIfDefined(formData, "type", payload.type);
  }

  if (payload.steps !== undefined) {
    formData.append("steps", JSON.stringify(payload.steps));
  }

  if ("delete_files_ids" in payload && payload.delete_files_ids !== undefined) {
    formData.append("delete_files_ids", JSON.stringify(payload.delete_files_ids));
  }

  payload.files?.forEach((file) => {
    formData.append("files", file);
  });

  return formData;
};
