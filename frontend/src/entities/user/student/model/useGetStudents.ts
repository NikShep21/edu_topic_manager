import type { StudentData } from "@/entities/user/base/model/types";
import { getStudents } from "@/entities/user/student/api/getStudents";
import type {
  // PaginatedResponse,
  StudentsQueryParams,
} from "@/entities/user/student/api/types";
import { studentQueryKeys } from "@/entities/user/student/model/queryKeys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useStudentsQuery = (query: StudentsQueryParams) => {
  return useQuery<StudentData[]>({
    queryKey: studentQueryKeys.list(query),
    queryFn: () => getStudents(query),
    placeholderData: keepPreviousData,
  });
};
