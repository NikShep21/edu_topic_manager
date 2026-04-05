import { authClient } from "@/shared/api";
import { STUDENTS_PATH } from "@/entities/user/student/api/constants";
import type {
  // PaginatedResponse,
  StudentsQueryParams,
} from "@/entities/user/student/api/types";
import type { StudentData } from "@/entities/user/base/model/types";

export const getStudents = async (query: StudentsQueryParams): Promise<StudentData[]> => {
  const data = await authClient.get<StudentData[]>(STUDENTS_PATH, {
    query,
  });

  return data;
};
