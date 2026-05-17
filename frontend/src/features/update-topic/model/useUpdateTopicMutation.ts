import { topicQueryKeys, updateTopic } from "@/entities/topic";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTopicMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTopic,
    onSuccess: (topic) => {
      queryClient.invalidateQueries({ queryKey: topicQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: topicQueryKeys.detail(topic.id) });
    },
  });
};
