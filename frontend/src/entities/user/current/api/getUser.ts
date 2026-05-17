import type { StudentData, TeacherData, UserData } from "@/entities/user";
import { USER_PATH } from "@/entities/user/current/api/constants";
import { authClient } from "@/shared/api";

type UserType = UserData | StudentData | TeacherData;

export const getUser = async (): Promise<UserType> => {
  const data: UserType = await authClient.get(USER_PATH);
  return data;
};
