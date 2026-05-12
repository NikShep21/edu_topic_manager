import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTopic } from "../api/updateTopic";
import { topicQueryKeys } from "./queryKeys";

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
