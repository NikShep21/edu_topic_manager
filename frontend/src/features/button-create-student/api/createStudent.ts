import { CREATE_STUDENT } from "@/features/button-create-student/api/constants";
import type { createStudentRequest } from "@/features/button-create-student/api/types";
import { authClient } from "@/shared/api";

export const createStudent = async (data: createStudentRequest) => {
  return authClient.post<null>(CREATE_STUDENT, data);
};
