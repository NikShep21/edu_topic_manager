import { createTopic, topicQueryKeys } from "@/entities/topic";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTopicMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTopic,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: topicQueryKeys.lists() }),
  });
};
