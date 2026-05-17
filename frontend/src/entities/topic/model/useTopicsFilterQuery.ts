import {
  getStudentTopicFilterOptions,
  getTeacherTopicFilterOptions,
} from "@/entities/topic/api/getTopicFilterOptions";
import type { TopicsFilterOptions } from "@/entities/topic/api/types";
import { topicQueryKeys } from "@/entities/topic/model/queryKeys";
import type { UserRole } from "@/entities/user";
import { useQuery } from "@tanstack/react-query";

export const useTopicFilterOptionsQuery = (role: UserRole) => {
  return useQuery<TopicsFilterOptions>({
    queryKey: topicQueryKeys.filterOptions(role),
    queryFn: () =>
      role === "teacher"
        ? getTeacherTopicFilterOptions()
        : getStudentTopicFilterOptions(),
  });
};
