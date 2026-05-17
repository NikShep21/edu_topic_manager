import { getUser } from "@/entities/user/current/api/getUser";
import { userQueryKeys } from "@/entities/user/current/model/queryKeys";
import type { UserData } from "@/entities/user/base/model/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  return useQuery<UserData>({
    queryKey: [userQueryKeys.all],
    queryFn: getUser,
  });
};
