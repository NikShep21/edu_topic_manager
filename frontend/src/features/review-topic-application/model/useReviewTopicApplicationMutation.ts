import { useMutation, useQueryClient } from "@tanstack/react-query";

import { acceptTopic, rejectTopic, topicQueryKeys } from "@/entities/topic";
import { useToast } from "@/shared/model/toast/use-toast";

type ReviewTopicApplicationAction = "accept" | "reject";

interface ReviewTopicApplicationParams {
  topicId: number;
  action: ReviewTopicApplicationAction;
}

export const useReviewTopicApplicationMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ topicId, action }: ReviewTopicApplicationParams) => {
      if (action === "accept") {
        return acceptTopic(topicId);
      }

      return rejectTopic(topicId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: topicQueryKeys.all,
      });
    },

    onError: (_error, variables) => {
      showToast({
        title: "Ошибка",
        message:
          variables.action === "accept"
            ? "Не удалось принять заявку"
            : "Не удалось отклонить заявку",
        variant: "error",
      });
    },
  });
};
