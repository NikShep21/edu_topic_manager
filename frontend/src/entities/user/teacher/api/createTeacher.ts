import { authClient } from "@/shared/api";

import { USERS } from "./constants";
import type { CreateTeacherRequest } from "./types";

export const createTeacher = async (data: CreateTeacherRequest) => {
  return authClient.post<null>(USERS, data);
};
