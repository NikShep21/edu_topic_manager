import { USERS } from "@/entities/user/student/api/constants";
import type { createStudentRequest } from "@/entities/user/student/api/types";
import { authClient } from "@/shared/api";

export const createStudent = async (data: createStudentRequest) => {
  return authClient.post<null>(USERS, data);
};
