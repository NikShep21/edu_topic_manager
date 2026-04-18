import { EDIT_STUDENT } from "@/features/edit-student/api/constants";
import type { UpdateStudentRequest } from "@/features/edit-student/api/types";
import { authClient } from "@/shared/api";

export const updateStudent = async (data: UpdateStudentRequest, id: number) => {
  return authClient.patch<null>(`${EDIT_STUDENT}/${id}`, data);
};
