import type { UserData } from "@/entities/user/base/model/types";

export const getFullName = (
  user: Pick<UserData, "first_name" | "last_name" | "middle_name">,
) => `${user.last_name} ${user.first_name} ${user.middle_name}`;
