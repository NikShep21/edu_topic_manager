import { getTeachersFilterOptions } from "@/entities/user/teacher/api/getTeachersFilterOptions";
import type { TeachersFilterFields } from "@/entities/user/teacher/api/types";
import { teacherQueryKeys } from "@/entities/user/teacher/model/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useTeachersFilterQuery = () => {
  return useQuery<TeachersFilterFields>({
    queryKey: teacherQueryKeys.filterOptions(),
    queryFn: getTeachersFilterOptions,
  });
};
