import { logout } from "@/entities/session";
import { useMutation } from "@tanstack/react-query";

export const useLogoutMutation = () => {
  return useMutation<void, Error>({
    mutationFn: logout,
  });
};
