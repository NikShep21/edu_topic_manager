import { login, type LoginRequest, type LoginResponse } from "@/entities/session";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
  });
};
