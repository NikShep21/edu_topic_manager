import type { UserData } from "@/entities/user";
import { USER_PATH } from "@/entities/user/api/constants";
import { fetchServer } from "@/shared/api";

export const requestUserServer = async (): Promise<UserData> => {
  const data: UserData = await fetchServer.get(USER_PATH);
  return data;
};
