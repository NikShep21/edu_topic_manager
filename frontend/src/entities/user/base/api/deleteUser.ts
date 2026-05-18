import { deleteUserUrl } from "@/entities/user/base/api/constants";
import { authClient } from "@/shared/api";

export const deleteUser = async (id: number) => {
  return authClient.delete<null>(deleteUserUrl(id));
};
