import type { CurrentUserData } from "@/entities/user";
import { USER_PATH } from "@/entities/user/current/api/constants";
import { authClient } from "@/shared/api";

export const getUser = async (): Promise<CurrentUserData> => {
  const data: CurrentUserData = await authClient.get(USER_PATH);
  return data;
};
