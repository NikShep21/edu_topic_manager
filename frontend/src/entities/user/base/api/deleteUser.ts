import { DELETE_USER } from "@/entities/user/base/api/constants";
import { authClient } from "@/shared/api";

export const deleteUser = async (id: number) => {
  return authClient.delete<null>(`${DELETE_USER}/${id}`);
};
