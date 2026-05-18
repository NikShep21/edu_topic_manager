import { authClient } from "@/shared/api";

import type { UpdateTeacherRequest } from "./types";
import { getTeacher } from "@/entities/user/teacher/api/constants";

export const updateTeacher = async (data: UpdateTeacherRequest, id: number) => {
  return authClient.patch<null>(getTeacher(id), data);
};
