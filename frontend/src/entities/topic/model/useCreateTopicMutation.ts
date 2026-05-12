import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTopic } from "../api/createTopic";
import { topicQueryKeys } from "./queryKeys";

export const useCreateTopicMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTopic,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: topicQueryKeys.lists() }),
  });
};
