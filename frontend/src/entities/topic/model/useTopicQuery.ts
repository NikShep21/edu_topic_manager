import { getTopic } from "@/entities/topic/api/getTopic";
import { topicQueryKeys } from "@/entities/topic/model/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useTopicQuery = (topicId: number) => {
  return useQuery({
    queryKey: topicQueryKeys.detail(topicId),
    queryFn: () => getTopic(topicId),
  });
};
