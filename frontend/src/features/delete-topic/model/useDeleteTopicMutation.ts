import { deleteTopic, topicQueryKeys } from "@/entities/topic";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTopic,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: topicQueryKeys.lists() }),
  });
};
