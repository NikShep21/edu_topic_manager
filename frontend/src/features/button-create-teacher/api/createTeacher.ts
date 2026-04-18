import { authClient } from "@/shared/api";

import { CREATE_TEACHER } from "./constants";
import type { CreateTeacherRequest } from "./types";

export const createTeacher = async (data: CreateTeacherRequest) => {
  return authClient.post<null>(CREATE_TEACHER, data);
};
