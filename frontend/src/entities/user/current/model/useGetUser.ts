import { getUser } from "@/entities/user/current/api/getUser";
import { userQueryKeys } from "@/entities/user/current/model/queryKeys";
import type { CurrentUserData } from "@/entities/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  return useQuery<CurrentUserData>({
    queryKey: [userQueryKeys.all],
    queryFn: getUser,
  });
};
