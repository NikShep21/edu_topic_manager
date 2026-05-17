import { useMutation, useQueryClient } from "@tanstack/react-query";

import { applyTopic, topicQueryKeys } from "@/entities/topic";
import { useToast } from "@/shared/model/toast/use-toast";

export const useApplyTopicMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: applyTopic,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: topicQueryKeys.all,
      });
    },

    onError: () => {
      showToast({
        title: "Ошибка",
        message: "Не удалось отправить заявку на тему",
        variant: "error",
      });
    },
  });
};
