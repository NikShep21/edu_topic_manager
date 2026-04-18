import { authClient } from "@/shared/api";
import { STUDENTS_PATH } from "@/entities/user/student/api/constants";
import type { StudentsQueryParams } from "@/entities/user/student/api/types";
import type { StudentData } from "@/entities/user/base/model/types";
import type { PaginatedResponse } from "@/shared/lib/api/types";

export const getStudents = async (
  query: StudentsQueryParams,
): Promise<PaginatedResponse<StudentData>> => {
  const data = await authClient.get<PaginatedResponse<StudentData>>(STUDENTS_PATH, {
    query,
  });
  console.log(data);
  return data;
};
