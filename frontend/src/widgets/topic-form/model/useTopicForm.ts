import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCreateTopicMutation } from "@/features/create-topic";
import { useUpdateTopicMutation } from "@/features/update-topic";

import { buildCreateTopicPayload, buildUpdateTopicPayload } from "./buildTopicPayload";
import { topicFormSchema, type TopicFormValues } from "./topicFormSchema";
import type { TopicFormProps } from "./types";

export const useTopicForm = ({
  mode = "create",
  initialData,
  onSuccess,
}: TopicFormProps) => {
  const isEdit = mode === "edit";

  const createTopicMutation = useCreateTopicMutation();
  const updateTopicMutation = useUpdateTopicMutation();

  const form = useForm<TopicFormValues>({
    resolver: zodResolver(topicFormSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      type: initialData?.type ?? "vkr",
      steps:
        initialData?.steps?.map((step) => ({
          title: step.title,
        })) ?? [],
      filesState: {
        files: initialData?.files ?? [],
        deletedIds: [],
      },
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      if (isEdit && initialData?.id) {
        const updatedTopic = await updateTopicMutation.mutateAsync({
          topicId: initialData.id,
          payload: buildUpdateTopicPayload(values),
        });

        onSuccess?.(updatedTopic, "edit");
        return;
      }

      const createdTopic = await createTopicMutation.mutateAsync(
        buildCreateTopicPayload(values),
      );

      onSuccess?.(createdTopic, "create");
    } catch {
      form.setError("root", {
        message: isEdit ? "Не удалось сохранить изменения" : "Не удалось создать тему",
      });
    }
  });

  const isPending = createTopicMutation.isPending || updateTopicMutation.isPending;

  return {
    form,
    isEdit,
    isPending,
    handleSubmit,
  };
};
