import { authClient } from "@/shared/api";

import type { UpdateTeacherRequest } from "./types";
import { EDIT_TEACHER } from "@/features/edit-teacher/api/constants";

export const updateTeacher = async (data: UpdateTeacherRequest, id: number) => {
  return authClient.patch<null>(`${EDIT_TEACHER}/${id}`, data);
};
