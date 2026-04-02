import { logout } from "@/features/logout/api/logout";
import { useMutation } from "@tanstack/react-query";

export const useLogoutMutation = () => {
  return useMutation<void, Error>({
    mutationFn: logout,
  });
};
