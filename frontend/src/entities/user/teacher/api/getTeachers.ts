import { authClient } from "@/shared/api";

import type { TeacherData } from "@/entities/user/base/model/types";
import { TEACHERS_PATH } from "@/entities/user/teacher/api/constants";
import type { PaginatedResponse } from "@/shared/lib/api/types";
import type { TeachersQueryParams } from "@/entities/user/teacher/api/types";

export const getTeachers = async (
  query: TeachersQueryParams,
): Promise<PaginatedResponse<TeacherData>> => {
  const data = await authClient.get<PaginatedResponse<TeacherData>>(TEACHERS_PATH, {
    query,
  });
  return data;
};
