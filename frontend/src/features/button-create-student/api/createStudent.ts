import { CREATE_STUDENT } from "@/features/button-create-student/api/constants";
import type { CreateStudentRequest } from "@/features/button-create-student/api/types";
import { authClient } from "@/shared/api";

export const createStudent = async (data: CreateStudentRequest) => {
  return authClient.post<null>(CREATE_STUDENT, data);
};
