import { CREATE_STUDENT } from "@/features/button-create-student/api/constants";
import type { createStudentRequest } from "@/features/button-create-student/api/types";
import { fetchClient } from "@/shared/api";

export const createStudent = async (data: createStudentRequest) => {
  return fetchClient.post<null>(CREATE_STUDENT, data);
};
