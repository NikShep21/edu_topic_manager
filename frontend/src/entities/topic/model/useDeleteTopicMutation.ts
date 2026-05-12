import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTopic } from "../api/deleteTopic";
import { topicQueryKeys } from "./queryKeys";

export const useDeleteTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTopic,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: topicQueryKeys.lists() }),
  });
};
