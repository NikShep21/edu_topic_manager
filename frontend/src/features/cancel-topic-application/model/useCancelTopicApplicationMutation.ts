import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cancelTopicApplication, topicQueryKeys } from "@/entities/topic";
import { useToast } from "@/shared/model/toast/use-toast";

export const useCancelTopicApplicationMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: cancelTopicApplication,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: topicQueryKeys.all,
      });
    },

    onError: () => {
      showToast({
        title: "Ошибка",
        message: "Не удалось отменить заявку",
        variant: "error",
      });
    },
  });
};
