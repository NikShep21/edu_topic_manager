import { getStudent } from "@/entities/user/student/api/constants";
import type { UpdateStudentRequest } from "@/entities/user/student/api/types";
import { authClient } from "@/shared/api";

export const updateStudent = async (data: UpdateStudentRequest, id: number) => {
  return authClient.patch<null>(getStudent(id), data);
};
