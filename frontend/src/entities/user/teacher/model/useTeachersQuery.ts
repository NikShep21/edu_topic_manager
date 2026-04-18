import type { TeacherData } from "@/entities/user/base/model/types";

import { getTeachers } from "@/entities/user/teacher/api/getTeachers";
import type { TeachersQueryParams } from "@/entities/user/teacher/api/types";
import { teacherQueryKeys } from "@/entities/user/teacher/model/queryKeys";
import type { PaginatedResponse } from "@/shared/lib/api/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useTeachersQuery = (query: TeachersQueryParams) => {
  return useQuery<PaginatedResponse<TeacherData>>({
    queryKey: teacherQueryKeys.list(query),
    queryFn: () => getTeachers(query),
    placeholderData: keepPreviousData,
  });
};
