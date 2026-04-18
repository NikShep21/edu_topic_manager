import { TEACHERS_FILTERS_PATH } from "@/entities/user/teacher/api/constants";
import type { TeachersFilterFields } from "@/entities/user/teacher/api/types";
import { authClient } from "@/shared/api";

export const getTeachersFilterOptions = async (): Promise<TeachersFilterFields> => {
  const data = await authClient.get<TeachersFilterFields>(TEACHERS_FILTERS_PATH);

  return data;
};
