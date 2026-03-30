import { requestUserClient } from "@/entities/user/api/request.user.client";
import { userQueryKeys } from "@/entities/user/model/query-keys";
import type { UserData } from "@/entities/user/model/types";
import { useQuery } from "@tanstack/react-query";

export const UseUserQuery = () => {
  return useQuery<UserData>({
    queryKey: [userQueryKeys.all],
    queryFn: requestUserClient,
  });
};
