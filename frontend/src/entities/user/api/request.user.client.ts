import type { UserData } from "@/entities/user";
import { USER_PATH } from "@/entities/user/api/constants";
import { fetchClient } from "@/shared/api";

export const requestUserClient = async (): Promise<UserData> => {
  const data: UserData = await fetchClient.get(USER_PATH);
  return data;
};
