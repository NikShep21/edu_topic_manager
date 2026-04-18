import { getStudentsFilterOptions } from "@/entities/user/student/api/getStudentsFilterOptions";
import type { StudentsFilterFields } from "@/entities/user/student/api/types";
import { studentQueryKeys } from "@/entities/user/student/model/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useStudentsFilterQuery = () => {
  return useQuery<StudentsFilterFields>({
    queryKey: studentQueryKeys.filterOptions(),
    queryFn: getStudentsFilterOptions,
  });
};
