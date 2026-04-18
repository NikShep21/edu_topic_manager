import { authClient } from "@/shared/api";

import type { StudentsFilterFields } from "@/entities/user/student/api/types";
import { STUDENTS_FILTERS_PATH } from "@/entities/user/student/api/constants";

export const getStudentsFilterOptions = async (): Promise<StudentsFilterFields> => {
  const data = await authClient.get<StudentsFilterFields>(STUDENTS_FILTERS_PATH);

  return data;
};
